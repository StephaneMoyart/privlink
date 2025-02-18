import { getSession } from "@/auth/session"
import { query } from "@/db/db"

export type PopulatedFlatEvent = Omit<EventT, '_id' | 'creator' | 'participants'> & {
    _id: string
    creator: {
        _id: string
        firstname: string
        lastname: string
        avatarUrl: string
    }
    participants: {
        _id: string
        firstname: string
        avatarUrl: string
    }[]
}

export const getEvents = async () => {
    // shield
    const session = await getSession()
    // end shield
    console.log(session);


    return await query('SELECT jsonb_build_object(\'event\', jsonb_build_object(\'id\', e.id, \'creator\', e.creator, \'title\', e.title, \'description\', e.description, \'startDate\', e.start_date, \'endDate\', e.end_date, \'isFullDay\', e.is_full_day), \'participants\', jsonb_agg(DISTINCT jsonb_build_object(\'id\', p1.id, \'firstname\', p1.firstname, \'lastname\', p1.lastname, \'avatar\', p1.avatar)), \'invitedUsers\', jsonb_agg(DISTINCT jsonb_build_object(\'id\', p2.id, \'firstname\', p2.firstname, \'lastname\', p2.lastname, \'avatar\', p2.avatar))) FROM event e LEFT JOIN event_participant ep ON e.id = ep.event_id LEFT JOIN person p1 ON ep.participant_id = p1.id LEFT JOIN event_invitation ei ON e.id = ei.event_id LEFT JOIN person p2 ON ei.invited_person_id = p2.id WHERE e.creator = $1 OR ep.participant_id = $1 GROUP BY e.id', [session.id])

    return (await Event.find({
        $or: [
            { creator: session._id },
            { participants: { $in: [session._id] }}
        ]
    })
    .populate<Pick<PopulatedFlatEvent, 'creator'>>('creator', 'firstname lastname avatarUrl')
    .populate<Pick<PopulatedFlatEvent, 'participants'>>('participants', 'firstname avatarUrl'))
    .map(event => event.toJSON({flattenObjectIds: true}))
}