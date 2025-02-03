import { getEvents } from "../events/events.actions"
import { DayDisplayer } from "./components/dayDisplayer"
import { DisplaySelector } from "./components/display-selector"

const Page = async () => {
    const events = await getEvents()

    return (
        <div className="flex flex-col h-full gap-4">
            <DisplaySelector/>
            <DayDisplayer events={events}/>
        </div>


    )
}

export default Page