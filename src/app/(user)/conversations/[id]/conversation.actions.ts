'use server'

import { getSession } from "@/auth/session"
import { pool, query } from "@/db/db"
import { eventEmitter } from "@/feats/sse/new-message/event-emitter"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { z } from "zod"

const messageSchema = z.object({
    content: z.string().min(1)
})

const newTitleSchema = z.object({
    newTitle: z.string().min(1)
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

    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        await client.query(`
            INSERT INTO conversation_message (conversation_id, author_id, content)
            VALUES ($1, $2, $3)
        `, [conversationId, session.id, content])
        await client.query(`
            UPDATE conversation
            SET updated_at = DEFAULT, last_author = $1
            WHERE id = $2
        `, [session.id, conversationId])
        await client.query(`
            INSERT INTO conversation_last_seen (conversation_id, member_id)
            VALUES ($1, $2)
            ON CONFLICT (conversation_id, member_id)
            DO UPDATE SET date = DEFAULT
        `, [conversationId, session.id])

        await client.query('COMMIT')
    } catch(err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }

    eventEmitter.emit('newMessage', { message: 'refresh' })

    revalidatePath('')
}

export const deleteMessageAction = async (messageId: string) => {
    // shield
    const session = await getSession()
    // end shield

    await query(`
        DELETE FROM conversation_message
        WHERE id = $1
        AND author_id = $2
    `, [messageId, session.id])

    revalidatePath('')
}

export const editMessageAction = async (messageId: string, prev: unknown, formData: FormData) => {
    // shield
    const session = await getSession()
    // end shield

    const result = messageSchema.safeParse({
        content: formData.get('content')
    })

    if (!result.success) return {}

    const { content } = result.data

    await query(`
        UPDATE conversation_message
        SET content = $1
        WHERE id = $2
        AND author_id = $3
    `, [content, messageId, session.id])

    revalidatePath('')

    return { success: true}
}

export const quitConversationAction = async (conversationId: string) => {
    //shield
    const session = await getSession()
    //end shield

    await query(`
        DELETE FROM conversation_member
        WHERE conversation_id = $1
        AND member_id = $2
    `, [conversationId, session.id])

    redirect('/conversations')
}

export const editConversationNameAction = async (conversationId: string, prevState: unknown, formData: FormData) => {
    //shield
    const { id } = await getSession()
    //end shield

    const result = newTitleSchema.safeParse({
        newTitle: formData.get('newTitle')
    })

    if (!result.success) return { success: false}

    const { newTitle } = result.data

    await query(`
        UPDATE conversation c
        SET title = $1
        WHERE c.id = $2
        AND multi = true
        AND EXISTS (
            SELECT 1 FROM conversation_member
            WHERE conversation_id = c.id
            AND member_id = $3
            AND member_role = 'admin'
        )
    `, [newTitle, conversationId, id])
}