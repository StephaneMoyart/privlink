'use server'

import { getSession } from "@/auth/session"
import { pool } from "@/db/db"
import { redirect } from "next/navigation"
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

    const allMembers = [
        {
            id: session.id,
            role: 'admin'
        }, ...members.map(member => (
            {
                id: member,
                role: 'member'
            }
        ))
    ]

    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        const createdConversation = await client.query(`
            INSERT INTO conversation (multi, title)
            VALUES ($1, $2)
            RETURNING id
        `, [true, title])

        const conversationId = createdConversation.rows[0].id

        await Promise.all(allMembers.map(member => client.query(`
            INSERT INTO conversation_member (conversation_id, member_id, member_role)
            VALUES ($1, $2, $3)
        `, [conversationId, member.id, member.role ])))

        await client.query('COMMIT')

        return redirect(`/conversations/${conversationId}`)
    } catch (err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}