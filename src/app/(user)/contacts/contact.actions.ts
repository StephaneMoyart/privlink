'use server'

import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import connectDB from "@/db/db"
import { ContactInvitation, User } from "@/model"

export const getUserByQueryAction = async (query: string) => {
    // shield
    getSessionOrRedirect()
    // end shield

    const keywords = query.split(" ").filter(keyword => keyword.trim().length > 0)

    const searchCriteria = keywords.map(keyword => ({
        $or: [
            { firstname: { $regex: keyword, $options: "i" } },
            { lastname: { $regex: keyword, $options: "i" } }
        ]
    }))

    await connectDB()

    const users = await User
        .find({ $and: searchCriteria })
        .select('firstname lastname _id')

    return users.map(user => user.toJSON({flattenObjectIds: true}))
}

export const sendContactInvitationAction = async (invitedUserId: string) => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    const isContact = session.contacts.some(contact => contact.equals(invitedUserId))
    if (isContact) return { message: "Ce Link existe déjà."}

    await connectDB()

    console.log('ici');

    const isExisting = await ContactInvitation.findOne({
        invitedUser: invitedUserId,
        invitedByUser: session._id
    })
    if (isExisting) return { message: "Une invitation est déjà en cours."}

    await ContactInvitation.create({
        invitedUser: invitedUserId,
        invitedByUser: session._id,
    })

    // todoreturn
    return {}
}