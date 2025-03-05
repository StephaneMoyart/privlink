import 'server-only'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"

export const countEventsInvitations = async () => {
    const session = await getSession()

    const count = await query(`
        SELECT COUNT(*)
        FROM event_invitation
        WHERE invited_person_id = $1
    `, [session.id])

    return count[0].count
}