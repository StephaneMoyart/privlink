import { getEvents } from "@/data/get-events"
import { DisplayWrapper } from "./components/display-wrapper"
import { getSession } from "@/auth/session"
import { getContactsBirthdays } from "@/data/get-contacts-birthdays"

const Page = async () => {
    const session = await getSession()
    const events = await getEvents()
    const contactsWithBirthdays = await getContactsBirthdays()


    return (
        <div className="h-full">
            <DisplayWrapper events={events} sessionId={session.id} contactsWithBirthdays={contactsWithBirthdays} />
        </div>
    )
}

export default Page