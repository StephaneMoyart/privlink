'use server'

import { getSession } from "@/auth/session"
import { z } from "zod"

const createGroupConversationSchema = z.object({
    title: z.string().min(1)
})

export const createGroupConversationAction = async (members: string[], previousState: unknown, formData: FormData) => {
    //shield
    const session = await getSession()
    //end shield

    const result = createGroupConversationSchema.safeParse({
        title: formData.get('title')
    })

    if (!result.success) return { sucess: false, message: "Nom de conversation invalide."}

    const { title } = result.data

    const allMembers = [...members, session._id]

    const conversations = await Conversation.find({
        multi: true,
        members : { $in: [session._id] }
    })

    if (conversations.find(conversation => conversation.members.length === allMembers.length
        && allMembers.every(member => conversation.members.toString().includes(member.toString())))) return {success: false, message: "une conversation identique existe déjà."}

    await Conversation.create({
        multi: true,
        title: title,
        members : allMembers
    })
}