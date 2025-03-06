import { getSession } from "@/auth/session"
import { query } from "@/db/db"
import { EventT } from "./get-events"

export const getEvent = async (eventId: string) => {
    // shield
    await getSession()
    // end shield

    const event = await query<EventT>(`
        SELECT
            e.*,
            json_build_object(
                'id', cre.id,
                'firstname', cre.firstname,
                'lastname', cre.lastname,
                'avatar', cre.avatar
            ) AS creator,
            COALESCE(
                jsonb_agg(
                    DISTINCT
                    jsonb_build_object(
                        'id', p1.id,
                        'firstname', p1.firstname,
                        'lastname', p1.lastname,
                        'avatar', p1.avatar
                    )
                ) FILTER (WHERE p1.id IS NOT NULL),
                '[]'::jsonb
            ) AS participants,
            COALESCE(
                jsonb_agg(
                    DISTINCT
                    jsonb_build_object(
                        'id', p2.id,
                        'firstname', p2.firstname,
                        'lastname', p2.lastname,
                        'avatar', p2.avatar
                    )
                ) FILTER (WHERE p2.id IS NOT NULL),
                '[]'::jsonb
            ) AS invited_users
        FROM event e
        JOIN person cre
            ON e.creator = cre.id
        LEFT JOIN event_participant ep
            ON e.id = ep.event_id
        LEFT JOIN person p1
            ON ep.participant_id = p1.id
        LEFT JOIN event_invitation ei
            ON e.id = ei.event_id
        LEFT JOIN person p2
            ON ei.invited_person_id = p2.id
        WHERE e.id = $1
        GROUP BY e.id, cre.id, cre.firstname, cre.lastname, cre.avatar
    `, [eventId])

    return event[0]
}