'use client'

import { Ellipsis, Pencil, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import { deleteMessageAction } from "../conversation.actions"
import { Button } from "@/components/button"

type MessageSettingsProps = {
    conversationId: string
    messageId: string
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageSettings: React.FC<MessageSettingsProps> = ({ messageId, setIsEditing }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [pendingDelete, startDeleteTransition] = useTransition()

    return (
        <div className="relative w-18">
            { isVisible ?
                <div className="absolute top-0 right-0.5 flex flex-col gap-2 shadow rounded-md p-2 z-10 bg-white">
                    <div className="px-2">
                        <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                    </div>
                    <Button
                        onClick={() => setIsEditing(true)}
                        color="yellow"
                        icon
                    >
                        <Pencil/>
                    </Button>
                    <Button
                        icon
                        color="red"
                        disabled={pendingDelete}
                        pending={pendingDelete}
                        onClick={() => startDeleteTransition(() => deleteMessageAction(messageId))}
                    >
                        <Trash/>
                    </Button>
                </div>
                :
                <div className="flex justify-center p-2">
                    <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                </div>
            }
        </div>
    )
}