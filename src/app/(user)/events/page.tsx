import Link from "next/link"
import { getEvents } from "./events.actions"
import { EventCard } from "./components/event-card"
import { Button } from "@/components/button"
import { EventInvitation } from "@/model"
import { getSession } from "@/auth/session"
import { InvitationCountDisplayer } from "@/feats/invitation-count-displayer/invitation-count-displayer"

const Page = async () => {
    const session = await getSession()
    const events = await getEvents()
    const invitationsCount = await EventInvitation.countDocuments({invitedUsers: {$in: [session._id]}})

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
                <EventCard key={event._id} event={event} sessionId={session._id.toString()}/>
            ))}
        </div>
    )
}

export default Page