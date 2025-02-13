'use server'

import { getSession } from "@/auth/session"
import { eventEmitter } from "@/feats/sse/new-message/event-emitter"
import { Conversation } from "@/model"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

type EditMessageParams = {
    conversationId: string
    messageId: string
  }

const messageSchema = z.object({
    content: z.string().min(1)
})

export const newMessageAction = async (conversationId: string, prev:unknown, formData: FormData) => {
    // shield
    const session = await getSession()
    // end shield

    const result = messageSchema.safeParse({
        content: formData.get('content')
    })

    if (!result.success) return { message: "Format du message incorrect"}

    const { content } = result.data

    await Conversation.findByIdAndUpdate(
        conversationId,
        {
            $push: { messages: { author: session._id, content }},
            $set: {
                lastUpdate:  Date.now(),
                lastAuthor: session._id
            }
        }
    )

    eventEmitter.emit('newMessage', { message: 'refresh' })

    revalidatePath('')
}

export const deleteMessageAction = async (conversationId: string, messageId: string) => {
    // shield
    const session = await getSession()
    // end shield

    await Conversation.findByIdAndUpdate(conversationId, { $pull: { messages: { _id: messageId, author: session._id }}})

    revalidatePath('')
}

export const editMessageAction = async ({conversationId, messageId}: EditMessageParams, prev: unknown, formData: FormData) => {
    // shield
    await getSession()
    // end shield

    const result = messageSchema.safeParse({
        content: formData.get('content')
    })

    // todo
    if (!result.success) return {}

    const { content } = result.data

    console.log(messageId);

    await Conversation.updateOne(
        { _id: conversationId, 'messages._id': messageId },
        // todo : check if author is session
        { $set: { "messages.$.content": content }}
    )

    revalidatePath('')

    return { success: true}
}

export const quitConversationAction = async (conversationId: string) => {
    //shield
    const session = await getSession()
    //end shield

    await Conversation.updateOne(
        { _id: conversationId},
        {$pull: {members: session._id}}
    )

    redirect('/conversations')
}