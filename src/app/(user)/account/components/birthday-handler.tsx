'use client'

import { DayOfBirth, MonthOfBirth, YearOfBirth } from "@/components/birthday-picker"
import { Button } from "@/components/button"
import { Pencil } from "lucide-react"
import { useActionState, useState } from "react"
import { editBirthdayAction } from "../account.actions"

export const BirthdayHandler = () => {
    const [isEditing, setIsEditing] = useState(false)
    const [selectedDay, setSelectedDay ] = useState<string>("")
    const [selectedMonth, setSelectedMonth ] = useState<string>("")
    const [selectedYear, setSelectedYear ] = useState<string>("")
    const birthdayDate = false

    const [, action, pending] = useActionState(editBirthdayAction, null)

    return (
        <div className="flex">
            {isEditing
                ?
                <div className="flex">
                    <DayOfBirth selectedDay={selectedDay} setSelectedDay={setSelectedDay}/>
                    <MonthOfBirth selectedMonth={selectedMonth} setSelectedMonth={setSelectedMonth}/>
                    <YearOfBirth selectedYear={selectedYear} setSelectedYear={setSelectedYear}/>

                    <form action={action} className="flex gap-1">
                        <input type="hidden" name="day" value={selectedDay} />
                        <input type="hidden" name="month" value={selectedMonth} />
                        <input type="hidden" name="year" value={selectedYear} />
                        <Button pending={pending} disabled={pending}>
                            ok
                        </Button>
                    </form>
                </div>
                :
                <>
                    {birthdayDate
                        ?
                        birthdayDate
                        :
                        <p className="italic opacity-50">Date de naissance non renseignée</p>
                    }
                    <Button icon onClick={() => setIsEditing(true)}>
                        <Pencil/>
                    </Button>
                </>
            }
        </div>
    )
}