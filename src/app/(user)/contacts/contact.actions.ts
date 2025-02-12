'use server'

import { getSession } from "@/auth/session"
import { ContactInvitation, User } from "@/model"
import { FlattenedUser } from "@/model/user"

export type SelectedFlatUser = Omit<FlattenedUser, 'email' | 'password' | 'birthDate' | 'contacts'>

export const getUserByQueryAction = async (query: string) => {
    // shield
    const session = await getSession()
    // end shield

    const keywords = query.split(" ").filter(keyword => keyword.trim().length > 0)

    const searchCriteria = keywords.map(keyword => ({
        $or: [
            { firstname: { $regex: keyword, $options: "i" } },
            { lastname: { $regex: keyword, $options: "i" } }
        ]
    }))

    const users: SelectedFlatUser[] = (await User
        .find({ $and: [...searchCriteria, { _id: { $ne: session._id }}]})
        .select('firstname lastname avatarUrl _id'))
        .map(user => user.toJSON({flattenObjectIds: true}))

    return users
}

export const sendContactInvitationAction = async (invitedUserId: string) => {
    // shield
    const session = await getSession()
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