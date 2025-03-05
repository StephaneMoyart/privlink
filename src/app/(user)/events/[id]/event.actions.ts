'use server'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"
import { z } from "zod"

const createEventListSchema = z.object({
    title: z.string().min(2)
})

const addEventItemSchema = z.object({
    title: z.string().min(2)
})

export const createEventListAction = async (eventId: string, prevState: unknown, formData: FormData) => {
    //shield
    await getSession()
    //end shield

    const result = createEventListSchema.safeParse({
        title: formData.get('title')
    })

    if (!result.success) return { success: false}

    const { title } = result.data

    // todo check if has permission
    await query('INSERT INTO event_list (event_id, title) VALUES ($1, $2)', [eventId, title])
}

export const addEventItemAction = async (listId: string, prevState: unknown, formData: FormData) => {
    //shield
    await getSession()
    //end shield

    const result = addEventItemSchema.safeParse({
        title: formData.get(`${listId}itemTitle`)
    })

    if (!result.success) return { success: false }

    const { title } = result.data

    await query('INSERT INTO event_list_item (event_list_id, title) VALUES ($1, $2)', [listId, title])
}

export const updateHandledByAction = async (listItemId: string, handledBy: string | null) => {
    console.log('batman');

    //shield
    const session = await getSession()
    if (handledBy && handledBy !== session.id) return
    //end shield

    if (handledBy === session.id) {
        await query('UPDATE event_list_item eli SET handled_by = null where eli.id = $1', [listItemId])
        return
    }

    await query('UPDATE event_list_item eli SET handled_by = $1 WHERE eli.id = $2', [session.id, listItemId])
}