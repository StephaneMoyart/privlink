

import { getEvents } from "../events/events.actions"
import { DisplayWrapper } from "./components/display-wrapper"

const Page = async () => {
    const events = await getEvents()

    return (
        <div className="h-full">
            <DisplayWrapper events={events}/>
        </div>


    )
}

export default Page