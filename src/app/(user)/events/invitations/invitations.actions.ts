'use server'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"
import { revalidatePath } from "next/cache"

export const acceptEventInvitationAction = async (eventId: string) => {
    //shield
    const session = await getSession()
    //end shield

    await query('INSERT INTO event_participant (event_id, participant_id) VALUES ($1, $2)', [eventId, session.id])
    await query('DELETE FROM event_invitation WHERE invited_person_id = $1 AND event_id = $2', [session.id, eventId])

    revalidatePath('')
}

export const declineEventInvitationAction = async (eventId: string) => {
    //shield
    const session = await getSession()
    //end shield

   await query('DELETE FROM event_invitation WHERE invited_person_id = $1 AND event_id = $2', [session.id, eventId])

    revalidatePath('')
}