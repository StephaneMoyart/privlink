'use server'

import { getSession } from "@/auth/session"
import { Event, EventInvitation } from "@/model"
import { revalidatePath } from "next/cache"

export const acceptEventInvitationAction = async (invitationId: string, eventId: string) => {
    //shield
    const session = await getSession()
    //end shield

    const invitation = await EventInvitation.findById(invitationId); if (!invitation) return
    const event = await Event.findById(eventId); if (!event) return

    if (invitation.invitedUsers.length === 1 && invitation.invitedUsers[0].equals(session._id)) {
        await invitation.deleteOne()

        if(!event.participants.includes(session._id)) {
            event.participants.push(session._id)
            await event.save()
        }
        revalidatePath('')
        return
    }

    invitation.invitedUsers.pull(session._id)
    await invitation.save()

    event.participants.push(session._id)
    await event.save()

    revalidatePath('')
}

export const declineEventInvitationAction = async (invitationId: string) => {
    //shield
    const session = await getSession()
    //end shield

    const invitation = await EventInvitation.findById(invitationId); if (!invitation) return

    if (invitation.invitedUsers.length === 1 && invitation.invitedUsers[0].equals(session._id)) {
        await invitation.deleteOne()
        revalidatePath('')
        return
    }

    invitation.invitedUsers.pull(session._id)
    await invitation.save()

    revalidatePath('')
}