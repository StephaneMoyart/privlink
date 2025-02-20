import 'server-only'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"

export const getInvitationsCount = async () => {
    //shield
    const session = await getSession()
    //endshield

    const count = await query('SELECT COUNT(*)::INT FROM contact_invitation WHERE invited_person_id = $1', [session.id])
    return count[0].count
}