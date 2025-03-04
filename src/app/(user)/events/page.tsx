import Link from "next/link"
import { Button } from "@/components/button"
import { getSession } from "@/auth/session"
import { InvitationCountDisplayer } from "@/feats/invitation-count-displayer/invitation-count-displayer"
import { EventCard } from "@/feats/event-card/event-card"
import { getEvents } from "@/data/get-events"
import { countEventsInvitations } from "@/data/count-events-invitations"

const Page = async () => {
    const session = await getSession()

    const [events, invitationsCount] = await Promise.all([
        getEvents(),
        countEventsInvitations()
    ])

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
                <Link key={event.id} href={`/events/${event.id}`}>
                    <EventCard event={event} sessionId={session.id}/>
                </Link>
            ))}
        </div>
    )
}

export default Page