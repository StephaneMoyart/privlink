
import Link from "next/link"
import { getEvents } from "./events.actions"
import { EventCard } from "./components/event-card"

const Page = async () => {
    const events = await getEvents()

    return (
        <div className="w-full flex p-2 flex-col gap-2">
            <Link href={'/events/create'}>
                Créer un evenement
            </Link>

            {events.map(event => (
                <EventCard key={event._id} event={event}/>
            ))}
        </div>


    )
}

export default Page