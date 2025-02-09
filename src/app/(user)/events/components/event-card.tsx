'use client'

import { handleEventDateDisplay } from "@/lib/format-event-card-date";
import { Clock, Text } from "lucide-react";
import { EventCardSettings } from "./event-card-settings";

export const EventCard = ({ event, readOnly = false, sessionId }) => {
    const { _id, title, description, startDate, endDate, isFullDay, creator } = event

    const date = handleEventDateDisplay(startDate, endDate, isFullDay)

    const isCreator = sessionId === creator.toString()

    if (readOnly) return (
        <div className="space-y-2">
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
    )

    return (
        <div className="flex justify-between shadow p-2">
            <div className="space-y-2">
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

            {isCreator && <EventCardSettings eventId={ _id}/>}

        </div>
    )
}