'use server'

import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { Event } from "@/model"

export const getEvents = async () => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    return await Event.find({ creator: session._id })
}