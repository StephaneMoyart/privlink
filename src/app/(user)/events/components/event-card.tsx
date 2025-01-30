import { handleEventDateDisplay } from "@/lib/format-event-card-date";

export const EventCard = ({ event }) => {
    console.log(event);

    const { name, description, startDate, endDate, isFullDay } = event

    const date = handleEventDateDisplay(startDate, endDate, isFullDay)

    return (
        <div className="relative border border-black/20 shadow-sm shadow-black/20 rounded-sm">
            <p>{name}</p>
            <p>{description}</p>
            <p>{date}</p>
        </div>
    )
}