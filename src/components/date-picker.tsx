'use client'

import { cn } from "@/lib/cn"
import { days, months } from "@/lib/consts"
import { formatCalendarDate } from "@/lib/format-calendar-date"
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react"
import { useState } from "react"

type DatePickerProps = {
    dateName: string
}

export const DatePicker: React.FC<DatePickerProps> = ({ dateName }) => {
    const [isVisible, setIsVisible] = useState(false)

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

    const checkIfSelected = (i: number) => {
        if (i + 1 === date.getDate() && date.getMonth() === currentMonth && date.getUTCFullYear() === currentYear) return true
        return false
    }

    const formatedDate = formatCalendarDate(date)

    return (
        <div className="flex flex-col gap-1">
            <div
                onClick={() => setIsVisible(!isVisible)}
                className={cn("relative flex justify-center items-center w-[250px] h-12 px-4 border rounded-sm border-black/20 shadow cursor-pointer",
                    !isVisible && "hover:bg-black/20"
                )}
            >
                <p>{formatedDate}</p>
                <ChevronDown className={cn("absolute right-4 h-auto transition duration-300",
                    isVisible && "rotate-180"
                )}/>
            </div>

            <input type="hidden" name={dateName} value={date.toISOString()}/>

            {isVisible &&
                <div className="flex gap-2 flex-col items-center p-2 w-[250px] border border-black/20 rounded-md shadow-black/20 shadow-sm">
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

                    <div className="w-full grid grid-rows-6 grid-cols-7">
                        {[...Array(firstDayOffset)].map((_, i) => <span key={`empty-${i}`}/>)}
                        {[...Array(daysInMonth)].map((_, i) => (
                            <span
                                onClick={() => {
                                    setDate(new Date(currentYear, currentMonth, i + 1))
                                    setIsVisible(false)
                                }}
                                className={cn("text-center cursor-pointer hover:font-semibold",
                                    checkIfToday(i) && "text-green-500",
                                    checkIfSelected(i) && "bg-green-300"
                                )}
                                key={`day-${i}`}
                            >
                                {i + 1}
                            </span>
                        ))}
                    </div>
                </div>
            }

        </div>
    )
}