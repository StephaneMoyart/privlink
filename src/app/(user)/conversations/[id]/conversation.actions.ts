'use server'

import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { Conversation } from "@/model"
import { revalidatePath } from "next/cache"
import { z } from "zod"

const newMessageSchema = z.object({
    content: z.string()
})

export const newMessageAction = async (conversationId: string, prev:unknown, formData: FormData) => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    const result = newMessageSchema.safeParse({
        content: formData.get('content')
    })

    if (!result.success) return { message: "Format du message incorrect"}

    const { content } = result.data

    await Conversation.findByIdAndUpdate(
        conversationId,
        { $push: { messages: { author: session._id,content }}}
    )

    revalidatePath('/conversations')
}