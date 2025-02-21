'use client'

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog"
import { cn } from "@/lib/cn"
import { ArrowLeft, ArrowRight, Cake, Ticket } from "lucide-react"
import { useState } from "react"
import { EventCard } from "@/feats/event-card/event-card"
import { EventT } from "@/data/get-events"
import { UserBaseWithBirthday } from "@/data/get-contacts-birthdays"
import { Button } from "@/components/button"
import Link from "next/link"
import { UserAvatar } from "@/components/user-avatar"

type MonthDisplayerProps = {
    events: EventT[]
    sessionId: string
    contactsWithBirthdays: UserBaseWithBirthday[]
}

export const MonthDisplayer: React.FC<MonthDisplayerProps> = ({ events, sessionId, contactsWithBirthdays }) => {

    const days = ["Lu", "Ma", "Me", "Je", "Ve", "Sa", "Di"]
    const months = ["Janvier", "Fevrier", "Mars", "Avril", "Mai", "Juin", "Juillet", "Aout", "Septembre", "Octobre", "Novembre", "Decembre"]

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
                                        <Dialog>
                                            <DialogTrigger className="flex gap-2 items-center bg-blue-300 px-1 rounded cursor-pointer w-full truncate">
                                                <Ticket size={20}/>
                                                {event.title}
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogTitle>
                                                    Details de l&apos;évenement
                                                </DialogTitle>
                                                <EventCard readOnly event={event} sessionId={sessionId}/>
                                            </DialogContent>
                                        </Dialog>
                                    </div>
                                ))}

                                {dayBirthdays.map(contact => {
                                    const age = currentYear - new Date(contact.birthdate).getFullYear()

                                    return (
                                        <div key={contact.id} className="mb-1">
                                            <Dialog>
                                                <DialogTrigger className="flex items-center gap-2 bg-yellow-300 px-1 rounded cursor-pointer w-full truncate">
                                                    <Cake size={20}/>
                                                    {contact.firstname} {contact.lastname}
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogTitle className="flex items-center gap-2">
                                                        <p>Anniversaire de {contact.firstname} {contact.lastname}</p>
                                                        <UserAvatar
                                                            className="h-10 w-10 rounded-full"
                                                            avatar={contact.avatar}
                                                            height={40}
                                                            width={40}
                                                        />
                                                    </DialogTitle>
                                                    <div className="flex flex-col gap-4">
                                                        <div className="flex gap-2">
                                                            <Cake/>
                                                            <p>{contact.firstname} fêtera ses {age} ans</p>
                                                        </div>

                                                        <Button asChild>
                                                            <Link href={'/conversations'}>
                                                                Envoyer un message
                                                            </Link>
                                                        </Button>
                                                    </div>
                                                </DialogContent>
                                            </Dialog>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}