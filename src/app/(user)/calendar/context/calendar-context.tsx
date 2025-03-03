'use client'

import { UserBaseWithBirthday } from "@/data/get-contacts-birthdays"
import { EventT } from "@/data/get-events"
import { createContext, use } from "react"

type CalendarContextT = {
    events: EventT[]
    id: string
    contactsWithBirthdays: UserBaseWithBirthday[]
}

type CalendarProviderProps = {
    children: React.ReactNode
    value: CalendarContextT
}

const CalendarContext = createContext<CalendarContextT | null>(null)

export const CalendarProvider: React.FC<CalendarProviderProps> = ({ children, value }) => {
    return (
        <CalendarContext value={value}>
            {children}
        </CalendarContext>
    )
}

export const useCalendarContext = () => {
    const context = use(CalendarContext)
    if (!context) throw new Error("useCalendarContext must be used within a CalendarContext provider")
    return context
}