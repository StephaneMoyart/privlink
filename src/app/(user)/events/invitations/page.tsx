import { getSession } from "@/auth/session"
import { EventInvitation } from "@/model"
import { AcceptOrDeclineEventInvitation } from "./components/accept-or-decline-event-invitation"
import { redirect } from "next/navigation"

const Page = async () => {
    const session = await getSession()
    const invitations = (await EventInvitation
        .find({invitedUsers: {$in: [session._id]}})
        .populate('event', 'title')
        .populate('invitedBy', 'firstname lastname'))
        .map(invitation => invitation.toJSON({flattenObjectIds: true}))

    if (invitations.length === 0) return redirect('/events')

    return (
        <>
            {invitations.map(invitation => (
                <div key={invitation._id} className="flex justify-between">
                    <p>{invitation.invitedBy.firstname} {invitation.invitedBy.lastname} vous invite à rejoindre l&apos;évenement {invitation.event.title}</p>
                    <AcceptOrDeclineEventInvitation invitationId={invitation._id} eventId={invitation.event._id}/>
                </div>
            ))}
        </>
    )
}

export default Page