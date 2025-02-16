'use server'

import { getSession } from "@/auth/session"
import { revalidatePath } from "next/cache"

export const getContactInvitations = async () => {
    // shield
    const session = await getSession()
    // end shield

    return (await ContactInvitation
        .find({ invitedUser : session._id })
        .populate<{ invitedByUser : Pick<UserT, '_id' | 'firstname' | 'lastname' | 'avatarUrl'> }>('invitedByUser', 'firstname lastname avatarUrl'))
        .map(invitation => invitation.toJSON({flattenObjectIds: true}))
}

export const acceptContactInvitationAction = async (invitedByUserId: string, invitationId: string): Promise<void> => {
    // shield
    const session = await getSession()
    // end shield

    if (session.contacts.includes(new Types.ObjectId(invitedByUserId))) {
        await ContactInvitation.deleteOne({ _id: invitationId})
        return
    }

    // sync DB, success or abort all
    const DB = await mongoose.startSession()
    DB.startTransaction()

    try {
        await User.updateOne(
            { _id: invitedByUserId },
            { $addToSet: { contacts: session._id } },
            { session: DB }
        )

        await User.updateOne(
            { _id: session._id } ,
            { $addToSet: { contacts: invitedByUserId } },
            { session: DB }
        )

        await Conversation.create(
            [{
                members: [ session._id, invitedByUserId ],
                lastAuthor: null
            }],
            { session: DB }
        )

        await ContactInvitation.deleteOne( {_id: invitationId }, { session: DB })

        await DB.commitTransaction()
    } catch (error) {
        await DB.abortTransaction()
        throw error;
    } finally {
        DB.endSession()
    }
    // end sync DB

    revalidatePath('')
}

export const declineContactInvitationAction = async (invitationId: string) => {
    // shield
    await getSession()
    // end shield

    await ContactInvitation.findByIdAndDelete(invitationId)

    revalidatePath('')
    // todo
}