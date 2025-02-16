import { getSession } from "@/auth/session"
import { EventInvitation, EventInvitationT } from "@/model/event-invitation"

export type PopulatedUser = {
    _id: string
    firstname: string
    avatarUrl: string
}

export type InvitedUsers = Omit<EventInvitationT, keyof EventInvitationT> & {
    invitedUsers: PopulatedUser[]
}

export const getEventInvitedUsers = async (eventId: string) => {
    //shield
    await getSession()
    //endshield

    const eventInvitation = (await EventInvitation.findOne({ event: eventId }).select('invitedUsers').populate<Pick<InvitedUsers, 'invitedUsers'>>('invitedUsers', '_id firstname avatarUrl'))?.toJSON({ flattenObjectIds: true }) as InvitedUsers

    return eventInvitation
}