'use server'

import { getSession } from "@/auth/session"
import { Conversation } from "@/model"
import { z } from "zod"

const createGroupConversationSchema = z.object({
    title: z.string().min(1)
})

export const createGroupConversationAction = async (members, previousState: unknown, formData: FormData) => {
    //shield
    const session = await getSession()
    //end shield

    const result = createGroupConversationSchema.safeParse({
        title: formData.get('title')
    })

    if (!result.success) return { sucess: false, message: "Nom de conversation invalide."}

    const { title } = result.data

    await Conversation.create({
        multi: true,
        title: title,
        members : [...members, session._id]
    })
}