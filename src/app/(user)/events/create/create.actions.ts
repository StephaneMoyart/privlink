'use server'

import { getSession } from "@/auth/session"
import { joinEventDatesandTimes } from "@/lib/join-event-dates-times"
import { z } from "zod"

const createEventSchema = z.object({
    title: z.string(),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date().nullable(),
    isFullDay: z.boolean(),
}).refine(data => !data.endDate || data.endDate > data.startDate, { message: "La date de fin doit être ultérieure à la date de début"})

export type newEventDataTypes = z.infer<typeof createEventSchema>

export const createEventAction = async (invitedUsers: string[], previousState: unknown, formData: FormData) => {
    // shield
    const session = await getSession()
    //end shield

    const rawData = Object.fromEntries(formData.entries())
    console.log(rawData);

    const data = joinEventDatesandTimes(rawData)
    console.log(data);


    const result = createEventSchema.safeParse({
        title: formData.get('title'),
        description: formData.get('description'),
        startDate: data.startDate,
        endDate: data.endDate,
        isFullDay: data.isFullDay
    })
    console.log(result);


    if (!result.success) {
        const specificError = result.error.errors.find(error => error.message === "La date de fin doit être ultérieure à la date de début")
        if (specificError) return { success: false, message: specificError.message }

        return { success: false, message: "erreur" }
    }

    const { title, description, startDate, endDate, isFullDay } = result.data

    // synchro

    const event = await Event.create({
        creator: session._id,
        title,
        description,
        startDate,
        endDate,
        isFullDay
    })

    await EventInvitation.create({
        event: event._id,
        invitedBy: session._id,
        invitedUsers
    })

}