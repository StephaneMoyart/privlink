'use server'

import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { ContactInvitation, User } from "@/model"

export const getUserByQueryAction = async (query: string) => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    const keywords = query.split(" ").filter(keyword => keyword.trim().length > 0)

    const searchCriteria = keywords.map(keyword => ({
        $or: [
            { firstname: { $regex: keyword, $options: "i" } },
            { lastname: { $regex: keyword, $options: "i" } }
        ]
    }))

    const users = await User
        .find({ $and: [...searchCriteria, { _id: { $ne: session._id }}]})
        .select('firstname lastname avatarUrl _id')

    return users.map(user => user.toJSON({flattenObjectIds: true}))
}

export const sendContactInvitationAction = async (invitedUserId: string) => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    if (session.contacts.some((contact) => contact.equals(invitedUserId))) return { message: "Ce Link existe déjà."}
    if (session._id.equals(invitedUserId)) return { message: "Opération impossible"}

    const isExisting = await ContactInvitation.findOne({
        invitedUser: invitedUserId,
        invitedByUser: session._id
    })
    if (isExisting) return { message: "Une invitation est déjà en cours." }

    await ContactInvitation.create({
        invitedUser: invitedUserId,
        invitedByUser: session._id,
    })

    // todoreturn
    return {}
}

export const getSessionContacts = async () => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    const contacts = await User.find({ _id: { $in: session.contacts }}, ('firstname lastname avatarUrl'))
    return contacts.map(contact => contact.toJSON({ flattenObjectIds: true }))
}

export const getContactInvitationsCount = async () => {
    // shield
    const session = await getSessionOrRedirect()
    //end shield

    return await ContactInvitation.countDocuments({ invitedUser: session._id })
}