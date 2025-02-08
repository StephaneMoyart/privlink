'use server'

import { getSession } from "@/auth/session"
import { Conversation } from "@/model"
import { revalidatePath } from "next/cache"
import { z } from "zod"

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
            $set: { lastUpdate:  Date.now()}
        }
    )

    revalidatePath('/conversations')
}

export const getSelectedConversationAction = async (conversationId) => {
    // shield
    await getSession()
    // end shield

    const conversation = await Conversation.findById(conversationId).populate('messages.author', 'firstname lastname avatarUrl')
    console.log(conversation);

    return conversation.toJSON({ flattenObjectIds: true})
}

export const deleteMessageAction = async (conversationId, messageId) => {
    // shield
    const session = await getSession()
    // end shield

    await Conversation.findByIdAndUpdate(conversationId, { $pull: { messages: { _id: messageId, author: session._id }}})

    revalidatePath('/conversations')
}

export const editMessageAction = async ({conversationId, messageId}, prev: unknown, formData: FormData) => {
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

    revalidatePath('/conversations')

    return { success: true}
}