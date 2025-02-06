'use server'

import { getSession } from "@/auth/session"
import { Event } from "@/model"
import { revalidatePath } from "next/cache"

export const getEvents = async () => {
    // shield
    const session = await getSession()
    // end shield

    const events = await Event.find({ creator: session._id })

    return events.map(event => event.toJSON({flattenObjectIds: true}))
}

export const deleteEventAction = async (eventId) => {
    // shield
    const session = await getSession()
    // end shield

    await Event.deleteOne({ _id: eventId, creator: session._id })

    revalidatePath('/events')
}