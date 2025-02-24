import { EventT } from "@/data/get-events"
import { cn } from "@/lib/cn"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useState } from "react"

type DayDisplayerProps = {
    events: EventT[]
}

export const DayDisplayer: React.FC<DayDisplayerProps> = ({ events }) => {
    const [currentDay, setCurrentDay] = useState(new Date())

    const prevDay = () => setCurrentDay(prev => {
        const newDate = new Date(prev)
        newDate.setDate(newDate.getDate() - 1)
        return newDate
    })

    const nextDay = () => setCurrentDay(prev => {
        const newDate = new Date(prev)
        newDate.setDate(newDate.getDate() + 1)
        return newDate
    })

    const currentDayString = currentDay.toLocaleDateString()

    const todayEvents = events.filter(event => {
        const startDateString = new Date(event.start_date).toLocaleDateString()
        const endDateString = event.end_date ? new Date(event.end_date).toLocaleDateString() : null

        return startDateString === currentDayString || endDateString === currentDayString || startDateString < currentDayString && endDateString! > currentDayString
    })

    const nbOfEvents = todayEvents.length

    const eventsDisplayer = todayEvents.map(event => {
        const startTime = (new Date(event.start_date).toLocaleDateString() < currentDayString)
            ? 0
            : (new Date(event.start_date).getHours()*60 + new Date(event.start_date).getMinutes())

        const endTime = !event.end_date && !event.is_full_day
            ? startTime + 15
            : event.end_date
                ? new Date(event.end_date).toLocaleDateString() > currentDayString
                    ? 1440
                    : (new Date(event.end_date).getHours()*60 + new Date(event.end_date).getMinutes())
                : 1440

        const totalTime = endTime - startTime
        const title = event.title

        return  { totalTime, startTime, title }
    })

    return (
        <div className={cn("flex gap-2 flex-col items-center p-2 w-full border border-black/20 rounded-md shadow-black/20 shadow-sm",
            todayEvents.length === 0 && "h-full"
        )}>
            <div className="flex w-full justify-evenly gap-2 p-4">
                <ArrowLeft className="cursor-pointer" onClick={() => {
                    prevDay()
                }}/>
                <div className="flex gap-2 justify-center w-[150px]">
                    <span>{currentDayString} </span>
                </div>
                <ArrowRight className="cursor-pointer" onClick={() => {
                    nextDay()
                }}/>
            </div>
            {todayEvents.length === 0
                ?
                <div className="flex h-full flex-1 items-center italic">
                    <p>Pas d&apos;evenement pour cette date </p>
                </div>
                :
                <div className="relative w-full">
                    <div className="relative w-full h-[1440px]">
                        {[...Array(24)].map((_, index) => (
                            <div key={index} className="absolute w-full left-0 h-[60px] border-b-[1px] border-black/50" style={{ top : (index*60) }}>
                                <p className="absolute bottom-0 text-sm/0.5 z-10 text-black/50 translate-y-[50%] left-[10px] bg-white px-2">{index + 1}</p>
                                <p className="absolute bottom-0 text-sm/0.5 z-10 text-black/50 translate-y-[50%] right-[10px] bg-white px-2">{index + 1}</p>
                            </div>
                        ))}
                    </div>
                    <div className="absolute left-[60px] top-0 h-[1440px] w-[calc(100%-120px)]">
                        {eventsDisplayer.map((event, index) => (
                            <div key={index} className="absolute w-full flex p-[2px]" style={{ top: `${event.startTime}px`, height: `${event.totalTime}px`, width: `${100 / nbOfEvents}%`, left: `${(100 / nbOfEvents)* index}%` }}>
                                <div className="flex justify-center items-center bg-blue-300 h-full w-full rounded">
                                    {event.title}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
        </div>
    )
}