'use server'

import { getSession } from "@/auth/session"
import { Conversation } from "@/model"
import { Types } from "mongoose"

type PopulatedMember = {
    _id: Types.ObjectId
    firstname: string
    lastname: string
    avatarUrl: string
}

type PopulatedConversation = Omit<Conversation, 'members'> & {
    members: PopulatedMember[]
}

export const getSessionConversations = async () => {
    // shield
    const session = await getSession()
    // end shield

    const conversations = await Conversation.find({
        members: { $in : [session._id]}
        })
        .populate('members', '_id firstname lastname avatarUrl')
        .sort({lastUpdate: - 1})
        .select('_id multi title members lastUpdate lastAuthor')
        .lean<PopulatedConversation[]>()

    return conversations.map(conversation => ({...conversation, members: conversation.members.filter(member => member._id.toString() !== session._id.toString())}))
}

export const updateLastSeenAction = async (conversationId: Types.ObjectId) => {
  //sield
  const session = await getSession()
  //end shield

  const conversation = await Conversation.findById(conversationId)

  const result = (conversation.lastSeen.find(element => element.member.equals(session._id)))
  if (result) {
    result.date = new Date()
  } else {
    conversation.lastSeen.push({
      member: session._id,
      date: new Date()
    })
  }

  await conversation.save()
}