'use client'

import { Ellipsis, Pencil, Trash } from "lucide-react"
import { useTransition } from "react"
import { deleteMessageAction } from "../conversation.actions"
import { Button } from "@/components/button"
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/dropdown"

type MessageSettingsProps = {
    conversationId: string
    messageId: string
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const MessageSettings: React.FC<MessageSettingsProps> = ({ messageId, setIsEditing }) => {
    const [pendingDelete, startDeleteTransition] = useTransition()

    return (
        <div className="relative w-18 p-2">
            <Dropdown>
                <DropdownTrigger>
                    <Ellipsis size={35} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                </DropdownTrigger>

                <DropdownContent>
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
                </DropdownContent>
            </Dropdown>

        </div>
    )
}