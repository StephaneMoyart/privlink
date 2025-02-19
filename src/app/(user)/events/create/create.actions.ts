'use server'

import { getSession } from "@/auth/session"
import { pool } from "@/db/db"
import { joinEventDatesandTimes } from "@/lib/join-event-dates-times"
import { z } from "zod"

const createEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    isFullDay: z.boolean(),
}).refine(data => !data.endDate || data.endDate > data.startDate, { message: "La date de fin doit être ultérieure à la date de début"})

export type newEventDataTypes = z.infer<typeof createEventSchema>

export const createEventAction = async (invitedUsers: string[], previousState: unknown, formData: FormData) => {
    // shield
    const session = await getSession()
    //end shield

    const rawData = Object.fromEntries(formData.entries())

    const data = joinEventDatesandTimes(rawData)

    const result = createEventSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        startDate: data.startDate,
        endDate: data.endDate,
        isFullDay: data.isFullDay
    })

    if (!result.success) {
        const specificError = result.error.errors.find(error => error.message === "La date de fin doit être ultérieure à la date de début")
        if (specificError) return { success: false, message: specificError.message }

        return { success: false, message: "erreur" }
    }

    const { title, description, startDate, endDate, isFullDay } = result.data

    const client = await pool.connect()

    try {
        await client.query('BEGIN')

        const event = await client.query('INSERT INTO event (creator, title, description, start_date, end_date, is_full_day) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id',
            [session.id, title, description, startDate, endDate, isFullDay]
        )
        const eventId = event.rows[0].id
        console.log(eventId);

        await Promise.all(invitedUsers.map(user => client.query('INSERT INTO event_invitation (event_id, invited_by_id, invited_person_id) VALUES ($1, $2, $3)', [eventId, session.id, user])))

        await client.query('COMMIT')
    } catch(err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }
}