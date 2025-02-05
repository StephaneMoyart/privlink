'use client'

import { cn } from "@/lib/cn"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

export const MonthDisplayer = ({ events }) => {

    const days = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"]
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

    const now = new Date()

    const [currentMonth, setCurrentMonth] = useState(now.getMonth())
    const [currentYear, setCurrentYear] = useState(now.getFullYear())

    const [date, setDate] = useState<Date>(new Date(new Date().setHours(0, 0, 0, 0)))

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

    const actualMonth = new Date().getMonth()
    const thisMonthEvents = events.filter(event => new Date(event.startDate).getMonth() === actualMonth || new Date(event.endDate).getMonth() === actualMonth)

    console.log("ohohoh", thisMonthEvents);

    const getEventsForDay = (day: number) => {
        const dayStart = new Date(currentYear, currentMonth, day + 1).setHours(0, 0, 0, 0)
        const dayEnd = new Date(currentYear, currentMonth, day + 1).setHours(23, 59, 59, 999)

        return events.filter(event => {
            const eventStart = new Date(event.startDate).getTime()
            const eventEnd = new Date(event.endDate).getTime()
            return (eventStart >= dayStart && eventStart <= dayEnd) || (eventEnd >= dayStart && eventEnd <= dayEnd)
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
                    return (
                        <div
                            onClick={() => {
                                setDate(new Date(currentYear, currentMonth, i + 1))
                            }}
                            className={cn("text-center bg-white",
                                checkIfToday(i) && "text-green-500"
                            )}
                            key={`day-${i}`}
                        >
                            <p>{i + 1}</p>
                            <div className="h-[90px] overflow-y-auto ">
                                {dayEvents.map(event => (
                                    <p key={event._id} className="truncate">
                                        {event.title}
                                    </p>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}