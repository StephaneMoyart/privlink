import { EventT } from "@/data/get-events"
import { ArrowLeft, ArrowRight } from "lucide-react"

type DayDisplayerProps = {
    events: EventT[]
}

export const DayDisplayer: React.FC<DayDisplayerProps> = ({ events }) => {
    const todayString = new Date().toLocaleDateString()
    console.log(todayString);

    const todayEvents = events.filter(event => {
                const startDateString = new Date(event.start_date).toLocaleDateString()
                const endDateString = event.end_date ? new Date(event.end_date).toLocaleDateString() : null

                return startDateString === todayString || endDateString === todayString || startDateString < todayString && endDateString! > todayString
    })
    console.log(todayEvents);

    const nbOfEvents = todayEvents.length
    console.log(nbOfEvents);


    const eventsDisplayer = todayEvents.map(event => {
                const startTime = (new Date(event.start_date).toLocaleDateString() < todayString)
                    ? 0
                    : (new Date(event.start_date).getHours()*60 + new Date(event.start_date).getMinutes())

                const endTime = event.end_date
                    ? new Date(event.end_date).toLocaleDateString() > todayString
                        ? 1440
                        : (new Date(event.end_date).getHours()*60 + new Date(event.end_date).getMinutes())
                    : 1440

                const totalTime = endTime - startTime
                const title = event.title

                return  { totalTime, startTime, title }
    })

    if (todayEvents.length === 0) {
        return (
            <div className="flex gap-2 flex-col items-center p-2 w-full h-full border border-black/20 rounded-md shadow-black/20 shadow-sm">
                <div className="flex w-full justify-evenly gap-2 p-4">
                    <ArrowLeft className="cursor-pointer" onClick={() => {

                    }}/>
                    <div className="flex gap-2 justify-center w-[150px]">
                        <span>day </span>
                    </div>
                    <ArrowRight className="cursor-pointer" onClick={() => {

                    }}/>
                </div>
                <div className="flex h-full flex-1 items-center italic">
                    <p>Pas d&apos;evenement pour cette date </p>
                </div>
            </div>
        )
    }

    return (
        <div className="flex gap-2 flex-col items-center p-2 w-full border border-black/20 rounded-md shadow-black/20 shadow-sm">
            <div className="flex w-full justify-evenly gap-2 p-4">
                <ArrowLeft className="cursor-pointer" onClick={() => {

                }}/>
                <div className="flex gap-2 justify-center w-[150px]">
                    <span>day </span>
                </div>
                <ArrowRight className="cursor-pointer" onClick={() => {

                }}/>
            </div>
            <div className="relative h-[1440px] w-full">
                {eventsDisplayer.map((event, index) => (
                    <div key={index} className="absolute w-full flex p-[2px]" style={{ top: `${event.startTime}px`, height: `${event.totalTime}px`, width: `${100 / nbOfEvents}%`, left: `${(100 / nbOfEvents)* index}%` }}>
                        <div className="flex justify-center items-center bg-blue-300 h-full w-full rounded">
                            {event.title}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}