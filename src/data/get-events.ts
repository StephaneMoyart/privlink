import { getSession } from "@/auth/session"
import { Event } from "@/model"
import { EventT } from "@/model/event"

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