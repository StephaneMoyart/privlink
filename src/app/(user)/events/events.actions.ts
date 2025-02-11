'use server'

import { getSession } from "@/auth/session"
import { Event, EventInvitation } from "@/model"
import { FlattenedEvent } from "@/model/event"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

export type PopulatedFlatEvent = Omit<FlattenedEvent, 'creator' | 'participants'> & {
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

export const deleteEventAction = async (eventId: string) => {
    // shield
    const session = await getSession()
    // end shield

    //sync
    const DB = await mongoose.startSession()
    DB.startTransaction()

    try {
        await Event.deleteOne({ _id: eventId, creator: session._id }, {session: DB})
        await EventInvitation.deleteOne({ event: eventId }, {session: DB})

        await DB.commitTransaction()
    } catch(error) {
        await DB.abortTransaction()
        throw error
    } finally {
        await DB.endSession()
    }
    //end sync

    revalidatePath('')
}