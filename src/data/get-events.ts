import { getSession } from "@/auth/session"
import { query } from "@/db/db"

export type UserBase = {
    id: string
    firstname: string
    lastname: string
    avatar?: string
}

export type EventT = {
    id: string
    creator: UserBase
    title: string
    description: string
    start_date: Date
    end_date: Date | null
    is_full_day: boolean
    participants: UserBase[],
    invited_users: UserBase[]
}

export const getEvents = async () => {
    // shield
    const session = await getSession()
    // end shield

    const events: EventT[] = await query('SELECT e.*, json_build_object(\'id\', cre.id, \'firstname\', cre.firstname, \'lastname\', cre.lastname, \'avatar\', cre.avatar) AS creator, COALESCE(jsonb_agg(DISTINCT jsonb_build_object(\'id\', p1.id, \'firstname\', p1.firstname, \'lastname\', p1.lastname, \'avatar\', p1.avatar)) FILTER (WHERE p1.id IS NOT NULL), \'[]\'::jsonb) AS participants, COALESCE(jsonb_agg(DISTINCT jsonb_build_object(\'id\', p2.id, \'firstname\', p2.firstname, \'lastname\', p2.lastname, \'avatar\', p2.avatar)) FILTER (WHERE p2.id IS NOT NULL), \'[]\'::jsonb) AS invited_users FROM event e JOIN person cre ON e.creator = cre.id LEFT JOIN event_participant ep ON e.id = ep.event_id LEFT JOIN person p1 ON ep.participant_id = p1.id LEFT JOIN event_invitation ei ON e.id = ei.event_id LEFT JOIN person p2 ON ei.invited_person_id = p2.id WHERE e.creator = $1 OR ep.participant_id = $1 GROUP BY e.id, cre.id',
        [session.id]
    )
    return events
}