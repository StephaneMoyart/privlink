import Link from "next/link"
import { getEvents } from "./events.actions"
import { EventCard } from "./components/event-card"
import { Button } from "@/components/classic-button"

const Page = async () => {
    const events = await getEvents()

    return (
        <div className="w-full flex p-2 flex-col gap-4">
            <Link href={'/events/create'}>
                <Button className="h-12 w-full">
                    Créer un evenement
                </Button>
            </Link>
            <p>Mes évenements</p>
            {events.map(event => (
                <EventCard key={event._id} event={event}/>
            ))}
        </div>
    )
}

export default Page