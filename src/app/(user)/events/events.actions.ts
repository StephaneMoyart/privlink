'use server'

import { getSession } from "@/auth/session"
import { Event, EventInvitation } from "@/model"
import mongoose from "mongoose"
import { revalidatePath } from "next/cache"

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