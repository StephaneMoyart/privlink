'use server'

import { getSession } from "@/auth/session"
import { Conversation } from "@/model"

export const getSessionConversations = async () => {
    // shield
    const session = await getSession()
    // end shield

    const conversations = await Conversation.find({
        members: { $in : [session._id]}
        })
        .populate({
            path: 'members',
            select: '_id firstname lastname avatarUrl',
        })
        .select('_id multi members')
        .lean()

    return conversations.map(conversation => ({...conversation, members: conversation.members.filter(member => !member._id.equals(session._id))}))
}