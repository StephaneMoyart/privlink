'use server'

import { getSession } from "@/auth/session"
import { Event, EventInvitation } from "@/model"
import { revalidatePath } from "next/cache"

export const acceptEventInvitationAction = async (invitationId: string, eventId: string) => {
    //shield
    const session = await getSession()
    //end shield

    const invitation = await EventInvitation.findById(invitationId)
    const event = await Event.findById(eventId)

    if (invitation.invitedUsers.length === 1 && invitation.invitedUsers[0].equals(session._id)) {
        await invitation.deleteOne()

        if(!event.participants.includes(session._id)) {
            event.participants.push(session._id)
            await event.save()
        }
        revalidatePath('/events/invitations')
        return
    }

    invitation.invitedUsers.pull(session._id)
    await invitation.save()

    event.participants.push(session._id)
    await event.save()

    revalidatePath('/events/invitations')
}

export const declineEventInvitationAction = async (invitationId: string) => {
    //shield
    const session = await getSession()
    //end shield

    console.log('ici');

    const invitation = await EventInvitation.findById(invitationId)

    if (invitation.invitedUsers.length === 1 && invitation.invitedUsers[0].equals(session._id)) {
        await invitation.deleteOne()
        revalidatePath('/events/invitations')
        return
    }

    console.log('ou la');

    invitation.invitedUsers.pull(session._id)
    await invitation.save()

    console.log('test');

    revalidatePath('/events/invitations')
}