'use server'

import { getSession } from "@/auth/session"
import { Event, EventInvitation } from "@/model"

export const acceptEventInvitationAction = async (invitationId, eventId) => {
    console.log('lalala', invitationId);

    //shield
    const session = await getSession()
    //end shield
    console.log(session);


    const invitation = await EventInvitation.findById(invitationId)
    const event = await Event.findById(eventId)

    console.log('blibli', invitation);


    if (invitation.invitedUsers.length === 1 && invitation.invitedUsers[0].equals(session._id)) {
        await invitation.deleteOne()

        if(!event.participants.includes(session._id)) {
            event.participants.push(session._id)
            await event.save()
        }
        return
    }

    invitation.invitedUsers.pull(session._id)
    await invitation.save()

    event.participants.push(session._id)
    await event.save()
}

export const declineEventInvitationAction = async (invitationId) => {
    //shield
    const session = await getSession()
    //end shield

    const invitation = await EventInvitation.findById(invitationId)

    if (invitation.invitedUsers.length === 1 && invitation.invitedUsers[0].equals(session._id)) return invitation.deleteOne()

    invitation.invitedUsers.pull(session._id)
    await invitation.save()
}