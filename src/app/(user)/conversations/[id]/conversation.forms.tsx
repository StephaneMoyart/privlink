'use client'

import { useActionState, useEffect } from "react"
import { editMessageAction, newMessageAction } from "./conversation.actions"
import { SendHorizontal } from "lucide-react"
import { Button } from "@/components/button"

type NewMessageFormProps = {
    conversationId: string
}

type EditMessageFormProps = {
    content: string
    messageId: string
    setIsEditing: React.Dispatch<React.SetStateAction<boolean>>
}

export const NewMessageForm: React.FC<NewMessageFormProps> = ({ conversationId }) => {
    const [, action, pending] = useActionState(newMessageAction.bind(null, conversationId), null)

    return (
        <form className="flex flex-col w-full rounded-md shadow" action={action}>
            <input
                className="px-4 h-12 rounded-t-md border outline-none"
                type="text"
                placeholder="Message"
                name="content"
            />
            <Button
                disabled={pending}
                pending={pending}
                className="h-10 rounded-t-none"
            >
                Envoyer
            </Button>
        </form>
    )
}

export const EditMessageForm: React.FC<EditMessageFormProps> = ({ content, messageId, setIsEditing }) => {
    const [state, action, pending] = useActionState(editMessageAction.bind(null, messageId), null)

    useEffect(() => {
        if (state?.success) setIsEditing(false)
    }, [state, setIsEditing])

    return (
            <form className="flex items-center h-full w-full py-2" action={action}>
                <input className="h-full w-full border rounded-l-md outline-none px-4" type="text" name="content" defaultValue={content}/>
                <Button
                    pending={pending}
                    disabled={pending}
                    className="h-full rounded-l-none"
                >
                    <SendHorizontal size={20}/>
                </Button>
            </form>
    )
}