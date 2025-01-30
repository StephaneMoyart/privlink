'use client'

import { useActionState, useEffect } from "react"
import { editMessageAction, newMessageAction } from "./conversation.actions"
import { SendHorizontal } from "lucide-react"

export const NewMessageForm = ({ conversationId }) => {
    const [, action, pending] = useActionState(newMessageAction.bind(null, conversationId), null)

    return (
        <form className="absolute rounded-md bottom-0 flex flex-col w-full shadow" action={action}>
            <input
                className="px-4 h-12 rounded-t-md border outline-none"
                type="text"
                placeholder="Message"
                name="content"
            />
            <button disabled={pending} className="h-10 rounded-b-md bg-zinc-950 border-2 border-zinc-800 text-white cursor-pointer hover:bg-zinc-800 hover:border-zinc-700 transition-colors duration-300">
                Envoyer
            </button>
        </form>
    )
}

export const EditMessageForm = ({ content, conversationId, messageId, setIsEditing }) => {
    const [state, action, pending] = useActionState(editMessageAction.bind(null, {conversationId, messageId}), null)

    useEffect(() => {
        if (state?.success) setIsEditing(false)
    }, [state, setIsEditing])

    return (
            <form className="flex items-center h-full w-full py-2" action={action}>
                <input className="h-full w-full border rounded-l-md outline-none px-4" type="text" name="content" defaultValue={content}/>
                <button disabled={pending} className="h-full px-4 rounded-r-md bg-zinc-950 border-2 border-zinc-800 text-white cursor-pointer hover:bg-zinc-800 hover:border-zinc-700 transition-colors duration-300">
                    <SendHorizontal size={20}/>
                </button>
            </form>
    )
}