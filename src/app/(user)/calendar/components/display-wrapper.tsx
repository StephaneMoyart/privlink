'use client'

import { useState } from "react"
import { DayDisplayer } from "./day-displayer"
import { DisplaySelector } from "./display-selector"
import { MonthDisplayer } from "./month-displayer"
import { WeekDisplayer } from "./week-displayer"

export const DisplayWrapper = ({ events }) => {
    const [display, setDisplay] = useState("month")

    return (
        <div className="flex flex-col gap-2 h-full">
            <DisplaySelector setDisplay={setDisplay}/>
            { display === "day" && <DayDisplayer /> }
            { display === "week" && <WeekDisplayer /> }
            { display === "month" && <MonthDisplayer events={events}/> }
        </div>
    )
}