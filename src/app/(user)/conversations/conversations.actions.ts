'use server'

import { getSession } from "@/auth/session"

// type PopulatedMember = {
//     _id: string
//     firstname: string
//     lastname: string
//     avatarUrl: string
// }

// type SelectedPopulatedFlatConversation = Omit <FlattenedConversation, 'members'> & {
//   members: PopulatedMember[]
// }



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