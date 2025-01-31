import Link from "next/link"
import { getEvents } from "./events.actions"
import { EventCard } from "./components/event-card"

const Page = async () => {
    const events = await getEvents()

    return (
        <div className="w-full flex p-2 flex-col gap-4">
            <Link href={'/events/create'} className="flex justify-center items-center h-12 px-4 bg-zinc-950 ring-2 ring-zinc-800 shadow shadow-black text-white rounded-sm cursor-pointer hover:bg-zinc-800 hover:ring-zinc-700 transition-colors duration-300">
                Créer un evenement
            </Link>
            <p>Mes évenements</p>
            {events.map(event => (
                <EventCard key={event._id} event={event}/>
            ))}
        </div>
    )
}

export default Page