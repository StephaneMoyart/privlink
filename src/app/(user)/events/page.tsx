import Link from "next/link"
import { Button } from "@/components/button"
import { getSession } from "@/auth/session"
import { InvitationCountDisplayer } from "@/feats/invitation-count-displayer/invitation-count-displayer"
import { EventCard } from "@/feats/event-card/event-card"
import { getEvents } from "@/data/get-events"

const Page = async () => {
    const session = await getSession()
    const events = await getEvents()
    console.log(events);


    // const invitationsCount = await EventInvitation.countDocuments({invitedUsers: {$in: [session.id]}})
    const invitationsCount = 1

    return (
        <div className="w-full flex p-2 flex-col gap-4">
            <Button asChild className="h-12 w-full">
                <Link href={'/events/create'}>
                    Créer un evenement
                </Link>
            </Button>

            <div className="flex gap-4">
                <p>Mes évenements</p>
                <InvitationCountDisplayer count={invitationsCount} href={'/events/invitations'} />
            </div>

            {events.map(event => (
                <EventCard key={event.id} event={event} sessionId={session.id}/>
            ))}
        </div>
    )
}

export default Page