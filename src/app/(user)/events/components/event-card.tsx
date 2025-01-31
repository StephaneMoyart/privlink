'use client'

import { handleEventDateDisplay } from "@/lib/format-event-card-date";
import { Clock, Text } from "lucide-react";
import { EventCardSettings } from "./event-card-settings";

export const EventCard = ({ event }) => {
    console.log(event);

    const { _id, title, description, startDate, endDate, isFullDay } = event

    const date = handleEventDateDisplay(startDate, endDate, isFullDay)

    return (
        <div className="flex justify-between shadow p-2">
            <div className="flex flex-col gap-2">
                <p className="text-xl font-bold">{title}</p>
                <div className="flex items-center gap-2">
                    <Text size={15}/>
                    <p className="text-sm">{description}</p>
                </div>
                <div className="flex items-center gap-2">
                    <Clock size={15}/>
                    <p className="text-sm">{date}</p>
                </div>
            </div>

            <EventCardSettings eventId={ _id}/>
        </div>
    )
}