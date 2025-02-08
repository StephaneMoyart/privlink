import { Event } from "@/model"
import { getEvents } from "../events/events.actions"
import { DisplayWrapper } from "./components/display-wrapper"

const Page = async () => {
    const events: Event[] = await getEvents()

    return (
        <div className="h-full">
            <DisplayWrapper events={events}/>
        </div>


    )
}

export default Page