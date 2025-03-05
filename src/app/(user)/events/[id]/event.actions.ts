'use server'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"
import { revalidatePath } from "next/cache"
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
    await query(`
        INSERT INTO event_list (event_id, title)
        VALUES ($1, $2)
    `, [eventId, title])

    revalidatePath('')
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

    await query(`
        INSERT INTO event_list_item (event_list_id, title)
        VALUES ($1, $2)
    `, [listId, title])

    revalidatePath('')
}

export const updateHandledByAction = async (listItemId: string, handledBy: string | null) => {
    //shield
    const session = await getSession()
    if (handledBy && handledBy !== session.id) return
    //end shield

    if (handledBy === session.id) {
        await query(`
            UPDATE event_list_item eli
            SET handled_by = null
            WHERE eli.id = $1
        `, [listItemId])

        revalidatePath('')
        return
    }

    await query(`
        UPDATE event_list_item eli
        SET handled_by = $1
        WHERE eli.id = $2
    `, [session.id, listItemId])

    revalidatePath('')
}

export const deleteListItemAction = async (itemId: string) => {
    //Shield
    await getSession()
    //end shield

    await query(`
        DELETE FROM event_list_item eli
        WHERE eli.id = $1
    `, [itemId])

    revalidatePath('')
}

export const deleteListAction = async (listId: string) => {
    //Shield
    await getSession()
    //end Shield

    await query(`
        DELETE FROM event_list el
        WHERE el.id = $1
    `, [listId])

    revalidatePath('')
}