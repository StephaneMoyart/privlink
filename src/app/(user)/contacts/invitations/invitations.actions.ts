'use server'

import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { ContactInvitation, Conversation, User } from "@/model"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

export const getContactInvitations = async () => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    const invitations = await ContactInvitation
        .find({ invitedUser : session._id })
        .populate('invitedByUser', 'firstname lastname avatarUrl')

    return invitations.map(invitation => invitation.toJSON({flattenObjectIds: true}))
}

export const acceptContactInvitationAction = async (invitedByUserId: string, invitationId: string) => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    if (session.contacts.includes(invitedByUserId)) {
        return await ContactInvitation.findByIdAndDelete(invitationId)
    }

    // sync DB, success or abort all
    const DB = await mongoose.startSession()
    DB.startTransaction()

    try {
        await User.findByIdAndUpdate(
            invitedByUserId,
            { $addToSet: { contacts: session._id } },
            { session: DB }
        )

        await User.findByIdAndUpdate(
            session._id,
            { $addToSet: { contacts: invitedByUserId } },
            { session: DB }
        )

        await Conversation.create(
            [{
                members: [ session._id, invitedByUserId ]
            }],
            { session: DB }
        )

        await ContactInvitation.findByIdAndDelete(invitationId, { session: DB })

        await DB.commitTransaction()
    } catch (error) {
        await DB.abortTransaction()
        throw error;
    } finally {
        DB.endSession()
    }
    // end sync DB

    revalidatePath('/contacts/invitations')

    // todo
    return { }
}

export const declineContactInvitationAction = async (invitationId: string) => {
    // shield
    await getSessionOrRedirect()
    // end shield

    await ContactInvitation.findByIdAndDelete(invitationId)

    revalidatePath('/contacts/invitations')
    // todo
}