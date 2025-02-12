'use server'

import { getSession } from "@/auth/session"
import { Conversation } from "@/model"
import { FlattenedConversation } from "@/model/conversation"

type PopulatedMember = {
    _id: string
    firstname: string
    lastname: string
    avatarUrl: string
}

type SelectedPopulatedFlatConversation = Omit <FlattenedConversation, 'members'> & {
  members: PopulatedMember[]
}

export const getSessionConversations = async () => {
    // shield
    const session = await getSession()
    // end shield

    return (await Conversation.find({
        members: { $in : [session._id]}
        })
        .populate<Pick<SelectedPopulatedFlatConversation, 'members'>>('members', '_id firstname lastname avatarUrl')
        .sort({lastUpdate: - 1})
        .select('_id multi title members lastUpdate lastAuthor'))
        .map(conversation => conversation.toJSON({ flattenObjectIds: true }))
        .map(conversation => ({...conversation, members: conversation.members.filter(member => member._id !== session._id.toString())}))
}

export const updateLastSeenAction = async (conversationId: string) => {
  //sield
  const session = await getSession()
  //end shield

  const conversation = await Conversation.findById(conversationId)

  const result = (conversation?.lastSeen.find(element => element.member.equals(session._id)))
  if (result) {
    result.date = new Date()
  } else {
    conversation?.lastSeen.push({
      member: session._id,
      date: new Date()
    })
  }

  await conversation?.save()
}