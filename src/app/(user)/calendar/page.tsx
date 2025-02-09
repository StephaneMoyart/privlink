import { Event } from "@/model"
import { getEvents } from "../events/events.actions"
import { DisplayWrapper } from "./components/display-wrapper"

const Page = async () => {
    // comes from the event action, i might consider globalising this action
    const events: Event[] = await getEvents()

    return (
        <div className="h-full">
            <DisplayWrapper events={events}/>
        </div>


    )
}

export default Page