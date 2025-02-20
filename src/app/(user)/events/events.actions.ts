'use server'

import { getSession } from "@/auth/session"
import { pool, query } from "@/db/db"
import { revalidatePath } from "next/cache"

export const deleteEventAction = async (eventId: string) => {
    // shield
    await getSession()
    // end shield

    const client = await pool.connect()

    try {
        await client.query('BEGIN')
        await client.query('DELETE FROM event_invitation WHERE event_id = $1', [eventId])
        await client.query('DELETE FROM event_participant WHERE event_id = $1', [eventId])
        await client.query('DELETE FROM event WHERE id = $1', [eventId])
        await client.query('COMMIT')
    } catch(err) {
        await client.query('ROLLBACK')
       throw err
    } finally {
        client.release()
    }

    revalidatePath('')
}

export const quitEventAction = async (eventId: string) => {
    //Shield
    const session = await getSession()
    //end shield

    await query('DELETE FROM event_participant WHERE event_id = $1 and participant_id = $2',
        [eventId, session.id]
    )

    revalidatePath('')
}