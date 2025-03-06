'use client'

import { handleEventDateDisplay } from "@/lib/format-event-card-date";
import { Clock, Text } from "lucide-react";
import { EventCardSettings } from "./event-card-settings";
import { EventT } from "@/data/get-events";
import { Creator } from "./creator";
import { Participants } from "./participants";
import { InvitedUsers } from "./invited-users";

type EventCardProps = {
    event: EventT
    readOnly?: boolean
    sessionId: string
}

export const EventCard: React.FC<EventCardProps> = ({ event, readOnly = false, sessionId }) => {

    const { id, title, description, start_date, end_date, is_full_day, creator, participants, invited_users: invitedUsers } = event
    const date = handleEventDateDisplay(start_date, end_date, is_full_day)

    const isCreator = sessionId === creator.id

    return (
        <div className="flex justify-between shadow p-2">
            <div className="space-y-2">
                <p className="text-xl font-bold">{title}</p>

                <Creator creator={creator} sessionId={sessionId}/>

                <Participants participants={participants} sessionId={sessionId}/>

                <InvitedUsers invitedUsers={invitedUsers} sessionId={sessionId}/>

                <div className="flex items-center gap-2">
                    <Text size={15}/>
                    <p className="text-sm">{description}</p>
                </div>

                <div className="flex items-center gap-2">
                    <Clock size={15}/>
                    <p className="text-sm">{date}</p>
                </div>
            </div>

            {!readOnly && <EventCardSettings eventId={id} isCreator={isCreator}/>}
        </div>
    )
}