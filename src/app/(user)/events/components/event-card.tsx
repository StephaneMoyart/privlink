'use client'

import { handleEventDateDisplay } from "@/lib/format-event-card-date";
import { Clock, Text } from "lucide-react";
import { EventCardSettings } from "./event-card-settings";
import { UserAvatar } from "@/components/user-avatar";

export const EventCard = ({ event, readOnly = false, sessionId }) => {
    const { _id, title, description, startDate, endDate, isFullDay, creator, participants } = event

    const date = handleEventDateDisplay(startDate, endDate, isFullDay)

    const isCreator = sessionId === creator._id

    return (
        <div className="flex justify-between shadow p-2">
            <div className="space-y-2">
                <p className="text-xl font-bold">{title}</p>

                <div className="flex items-center gap-2">
                    <p>Créé par :</p>
                    <UserAvatar className="w-6 h-6 rounded-full" avatarUrl={creator.avatarUrl} height={24} width={24}/>
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
                        <p>participants :</p>
                        <div className="flex -space-x-1">
                            {participants.map(participant => (
                                <UserAvatar key={participant._id} className="w-6 h-6 rounded-full" avatarUrl={participant.avatarUrl} height={24} width={24}/>
                            ))}
                        </div>
                        <div className="truncate">
                            {participants.map((participant, index) => (
                                <span key={index}>
                                    {(participant._id === sessionId)
                                        ?
                                        <span>Moi</span>
                                        :
                                        <span>{participant.firstname}</span>
                                    }
                                    {index < participants.length - 1 ? ", " : ""}
                                </span>
                            ))}
                        </div>
                    </div>
                    :
                    <p>Pas d&apos;autres participants</p>
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

            {!readOnly && isCreator && <EventCardSettings eventId={ _id}/>}

        </div>
    )
}