'use client'

import { handleEventDateDisplay } from "@/lib/format-event-card-date";
import { Clock, Text } from "lucide-react";
import { UserAvatar } from "@/components/user-avatar";
import { EventCardSettings } from "./event-card-settings";
import { EventT } from "@/data/get-events";

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

                <div className="flex items-center gap-2">
                    <p>Créé par :</p>
                    <UserAvatar className="w-6 h-6 rounded-full" avatar={creator.avatar} height={24} width={24}/>
                    {isCreator
                        ?
                        <p>Moi</p>
                        :
                        <p>{creator.firstname} {creator.lastname}</p>
                    }
                </div>

                {participants.length > 0
                    ?
                    <div className="flex items-center gap-2">
                        <p>Participants :</p>
                        <div className="flex -space-x-1">
                            {participants.map(participant => (
                                <UserAvatar key={participant.id} className="w-6 h-6 rounded-full" avatar={participant.avatar} height={24} width={24}/>
                            ))}
                        </div>
                        <div className="truncate">
                            {participants.map((participant, index) => (
                                <span key={index}>
                                    {(participant.id === sessionId) ? "Moi" : participant.firstname}
                                    {index < participants.length - 1 && ", "}
                                </span>
                            ))}
                        </div>
                    </div>
                    :
                    <p>Pas d&apos;autres participants</p>
                }

                {invitedUsers.length > 0 &&
                    <div className="flex items-center gap-2">
                        <p>En attente :</p>
                        <div className="flex -space-x-1">
                            {invitedUsers.map(user => (
                                <UserAvatar key={user.id} className="w-6 h-6 rounded-full" avatar={user.avatar} height={24} width={24}/>
                            ))}
                        </div>
                        <div className="truncate">
                            {invitedUsers.map((user, index) => (
                                <span key={index}>
                                    {(user.id === sessionId) ? "Moi" : user.firstname}
                                    {index < invitedUsers.length - 1 && ", "}
                                </span>
                            ))}
                        </div>
                    </div>
                }

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