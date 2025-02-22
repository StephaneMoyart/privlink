'use client'

import React, { useState } from "react"
import { DayDisplayer } from "./day-displayer"
import { DisplaySelector } from "./display-selector"
import { MonthDisplayer } from "./month-displayer"
import { WeekDisplayer } from "./week-displayer"
import { EventT } from "@/data/get-events"
import { UserBaseWithBirthday } from "@/data/get-contacts-birthdays"

type DisplayWrapperProps = {
    events: EventT[]
    sessionId: string
    contactsWithBirthdays: UserBaseWithBirthday[]
}

export const DisplayWrapper: React.FC<DisplayWrapperProps> = ({ events, sessionId, contactsWithBirthdays }) => {
    const [display, setDisplay] = useState("month")

    return (
        <div className="flex flex-col gap-2 h-full">
            <DisplaySelector setDisplay={setDisplay}/>
            { display === "day" && <DayDisplayer events={events} /> }
            { display === "week" && <WeekDisplayer /> }
            { display === "month" && <MonthDisplayer events={events} sessionId={sessionId} contactsWithBirthdays={contactsWithBirthdays} /> }
        </div>
    )
}