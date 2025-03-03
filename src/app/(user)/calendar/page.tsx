import { getEvents } from "@/data/get-events"
import { DisplayWrapper } from "./components/display-wrapper"
import { getSession } from "@/auth/session"
import { getContactsBirthdays } from "@/data/get-contacts-birthdays"
import { CalendarProvider } from "./context/calendar-context"

const Page = async () => {
    const [{id}, events, contactsWithBirthdays] = await Promise.all([
        getSession(),
        getEvents(),
        getContactsBirthdays()
    ])

    return (
        <CalendarProvider value={{events, id, contactsWithBirthdays}}>
            <div className="h-full">
                <DisplayWrapper />
            </div>
        </CalendarProvider>
    )
}

export default Page