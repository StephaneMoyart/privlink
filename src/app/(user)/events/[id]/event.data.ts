import { getSession } from "@/auth/session"
import { UserBase } from "@/data/get-events"
import { query } from "@/db/db"

 export type ListItem = {
    id: string
    title: string
    handled_by: UserBase | null
}

export type ListT = {
    id: string
    event_id: string
    title: string
    items: ListItem[]
}

export const getParticipativeListsWithItems = async (eventId: string) => {
    //shield
    await getSession()
    // end shield

    // todo check if sessionId is memeber of eventId
    return await query<ListT>(`
        SELECT
            el.*,
            COALESCE(
                jsonb_agg(
                    jsonb_build_object(
                        'id', eli.id,
                        'title', eli.title,
                        'handled_by',
                        CASE WHEN p.id IS NOT NULL THEN jsonb_build_object(
                            'id', p.id,
                            'firstname', p.firstname,
                            'lastname', p.lastname,
                            'avatar', p.avatar
                        ) ELSE NULL END
                    )
                ) FILTER (WHERE eli.id IS NOT NULL),
                '[]'
            ) AS items
        FROM event_list el
        LEFT JOIN event_list_item eli
            ON el.id = eli.event_list_id
        LEFT JOIN person p
            ON eli.handled_by = p.id
        WHERE el.event_id = $1
        GROUP BY el.id
    `, [eventId])
}