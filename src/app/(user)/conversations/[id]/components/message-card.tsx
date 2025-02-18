'use client'

import { UserAvatar } from "@/components/user-avatar"
import { MessageSettings } from "./settings-buttons"
import { useState } from "react"
import { EditMessageForm } from "../conversation.forms"
import { formatMessageDateAndTime } from "@/lib/format-message-date"

// type MessageCardProps = {
//     message: Omit<FlattenedConversation['messages'][number], 'author'> & {
//         author: PopulatedAuthor
//     }
//     conversationId: string
//     sessionId: string
// }

export const MessageCard: React.FC<MessageCardProps> = ({message, conversationId, sessionId}) => {
    const { id, author, content, created_at } = message
    console.log('tttt', message.created_at);

    const { firstname, lastname, avatarUrl, id: authorId } = author

    const [isEditing, setIsEditing] = useState(false)

    const isOwned = String(sessionId) === String (authorId)

    return (
        <div className="flex gap-2 justify-between" key={message._id}>
            <div className="flex w-full gap-2">
                <UserAvatar
                    className="w-15 h-15 rounded-full overflow-hidden"
                    width={60}
                    height={60}
                    avatarUrl={avatarUrl}
                />
                {isEditing
                    ?
                    <EditMessageForm content={content} conversationId={conversationId} messageId={id} setIsEditing={setIsEditing}/>
                    :
                    <div className="flex flex-col w-full gap-1">
                        <div className="flex gap-2 items-center">
                            <p className="max-md:text-sm font-bold">
                                <span>{firstname} </span>
                                <span>{lastname}</span>
                            </p>
                            <p className="max-md:text-[9px] text-xs opacity-60">{formatMessageDateAndTime(message.createdAt)}</p>
                        </div>
                        <p>
                            {content}
                        </p>
                    </div>
                }
            </div>
            <div>
                {isOwned &&
                    <MessageSettings conversationId={conversationId} messageId={ _id} setIsEditing={setIsEditing}/>
                }
            </div>
        </div>
    )
}