'use client'

import { cn } from "@/lib/cn"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"
import { days, months } from "@/lib/consts"
import { EventDialog } from "./event-dialog"
import { BirthdayDialog } from "./birthday-dialog"
import { useCalendarContext } from "../context/calendar-context"

export const MonthDisplayer = () => {
    const { events, contactsWithBirthdays } = useCalendarContext()

    const now = new Date()

    const [currentMonth, setCurrentMonth] = useState(now.getMonth())
    const [currentYear, setCurrentYear] = useState(now.getFullYear())

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate()
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay()

    const firstDayOffset = (firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1)

    const prevMonth = (prev: number) => (prev === 0) ? 11 : prev - 1
    const nextMonth = (prev: number) => (prev === 11) ? 0 : prev + 1

    const prevYear = (currentMonth: number) => (currentMonth === 0) ? currentYear - 1 : currentYear
    const nextYear = (currentMonth: number) => (currentMonth === 11) ? currentYear + 1 : currentYear

    const checkIfToday = (i: number) => {
        if (i + 1 === now.getDate() && currentMonth === now.getMonth() && currentYear === now.getFullYear()) return true
        return false
    }

    const getEventsForDay = (day: number) => {
        const calendarDay = new Date(currentYear, currentMonth, day + 1)
        calendarDay.setHours(0, 0, 0, 0)

        return events.filter(event => {
            const eventStart = new Date(event.start_date)
            const eventEnd = new Date(event.end_date as Date)
            eventStart.setHours(0, 0, 0, 0)

            return (
                eventStart.getTime() === calendarDay.getTime() ||
                eventEnd.getTime() === calendarDay.getTime() ||
                (eventStart < calendarDay && eventEnd > calendarDay)
            )
        })
    }

    const getBirthdaysForDay = (day: number) => {
        const calendarDay = new Date(currentYear, currentMonth, day + 1)
        calendarDay.setHours(0, 0, 0, 0)

        return contactsWithBirthdays.filter(contact => {
            const birthDay = new Date(contact.birthdate)
            birthDay.setHours(0, 0, 0, 0)

            console.log(birthDay, calendarDay);

            return birthDay.getDate() === calendarDay.getDate() && birthDay.getMonth() === calendarDay.getMonth()
        })
    }

    return (
        <div className="flex gap-2 flex-col items-center p-2 w-full border border-black/20 rounded-md shadow-black/20 shadow-sm">
            <div className="flex w-full justify-evenly gap-2 p-4">
                <ArrowLeft className="cursor-pointer" onClick={() => {
                    setCurrentYear(prevYear(currentMonth))
                    setCurrentMonth(prev => prevMonth(prev))
                }}/>
                <div className="flex gap-2 justify-center w-[150px]">
                    <span>{months[currentMonth]} </span>
                    <span>{currentYear}</span>
                </div>
                <ArrowRight className="cursor-pointer" onClick={() => {
                    setCurrentYear(nextYear(currentMonth))
                    setCurrentMonth(prev => nextMonth(prev))
                }}/>
            </div>

            <div className="w-full text-center grid grid-cols-7">
                {days.map(day => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="w-full grid grid-rows-6 grid-cols-7 border bg-black/20 gap-[1px]">
                {[...Array(firstDayOffset)].map((_, i) => <span key={`empty-${i}`}/>)}
                {[...Array(daysInMonth)].map((_, i) => {
                    const dayEvents = getEventsForDay(i)
                    const dayBirthdays = getBirthdaysForDay(i)

                    return (
                        <div
                            className="text-center bg-white"
                            key={`day-${i}`}
                        >
                            <p className={cn("", checkIfToday(i) && "text-green-500")}>{i + 1}</p>
                            <div className="p-1 h-[90px] overflow-y-auto ">
                                {dayEvents.map(event => (
                                    <div key={event.id} className="mb-1">
                                        <EventDialog event={event} />
                                    </div>
                                ))}

                                {dayBirthdays.map(contact => (
                                    <BirthdayDialog key={contact.id} currentYear={currentYear} contact={contact} />
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}