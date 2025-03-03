'use client'

import { UserAvatar } from "@/components/user-avatar"
import { MessageSettings } from "./settings-buttons"
import { useState } from "react"
import { EditMessageForm } from "../conversation.forms"
import { formatMessageDateAndTime } from "@/lib/format-message-date"
import { SelectConversationMessage } from "../conversation.data"

type MessageCardProps = {
    message: SelectConversationMessage
    sessionId: string
}

export const MessageCard: React.FC<MessageCardProps> = ({ message, sessionId }) => {
    const { id, author, content, created_at } = message
    const { firstname, lastname, avatar, id: authorId } = author

    const [isEditing, setIsEditing] = useState(false)

    const isOwned = sessionId === authorId

    return (
        <div className="flex gap-2 justify-between" key={id}>
            <div className="flex w-full gap-2">
                <UserAvatar
                    className="w-15 h-15 rounded-full overflow-hidden"
                    width={60}
                    height={60}
                    avatar={avatar}
                />
                {isEditing
                    ?
                    <EditMessageForm content={content} messageId={id} setIsEditing={setIsEditing}/>
                    :
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="max-md:text-sm font-bold">
                                <span>{firstname} </span>
                                <span>{lastname}</span>
                            </p>
                            <p className="max-md:text-[9px] text-xs opacity-60">{formatMessageDateAndTime(created_at)}</p>
                        </div>
                        <p>
                            {content}
                        </p>
                    </div>
                }
            </div>
            <div>
                {isOwned &&
                    <MessageSettings messageId={id} setIsEditing={setIsEditing}/>
                }
            </div>
        </div>
    )
}