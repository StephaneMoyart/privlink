'use server'

import { getSession } from "@/auth/session"
import { Event } from "@/model"
import { revalidatePath } from "next/cache"

export const getEvents = async () => {
    // shield
    const session = await getSession()
    // end shield

    return (await Event.find({
        $or: [
            { creator: session._id },
            { participants: { $in: [session._id] }}
        ]
    })).map(event => event.toJSON({flattenObjectIds: true}))
}

export const deleteEventAction = async (eventId) => {
    // shield
    const session = await getSession()
    // end shield

    await Event.deleteOne({ _id: eventId, creator: session._id })

    revalidatePath('/events')
}