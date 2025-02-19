import { getSession } from '@/auth/session'
import { UserBase } from '@/data/get-events'
import { query } from '@/db/db'
import 'server-only'

type EventInvitation = {
    event: {
        id: string
        title: string
    }
    invited_by : UserBase
}

export const getEventsInvitations = async () => {
    const session = await getSession()

    return await query<EventInvitation>('SELECT jsonb_build_object(\'id\', e.id, \'title\', e.title) AS event, jsonb_build_object(\'id\', p.id, \'firstname\', p.firstname, \'lastname\', p.lastname, \'avatar\', p.avatar) AS invited_by FROM event e JOIN event_invitation ei ON e.id = ei.event_id LEFT JOIN person p ON p.id = ei.invited_by_id WHERE ei.invited_person_id = $1', [session.id])
}