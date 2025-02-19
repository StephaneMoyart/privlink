import { AcceptOrDeclineEventInvitation } from "./components/accept-or-decline-event-invitation"
import { redirect } from "next/navigation"
import { getEventsInvitations } from "./invitations.data"

const Page = async () => {
    const invitations = await getEventsInvitations()

    if (invitations.length === 0) return redirect('/events')

    return (
        <>
            {invitations.map(invitation => (
                <div key={invitation.event.id} className="flex justify-between">
                    <p>{invitation.invited_by.firstname} {invitation.invited_by.lastname} vous invite à rejoindre l&apos;évenement {invitation.event.title}</p>
                    <AcceptOrDeclineEventInvitation eventId={invitation.event.id}/>
                </div>
            ))}
        </>
    )
}

export default Page