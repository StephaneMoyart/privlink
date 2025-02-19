import { getEvents } from "@/data/get-events"
import { DisplayWrapper } from "./components/display-wrapper"
import { getSession } from "@/auth/session"

const Page = async () => {
    const session = await getSession()
    const events = await getEvents()

    return (
        <div className="h-full">
            <DisplayWrapper events={events} sessionId={session.id}/>
        </div>
    )
}

export default Page