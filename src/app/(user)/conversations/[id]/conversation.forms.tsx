'use client'

import { useActionState } from "react"
import { newMessageAction } from "./conversation.actions"

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
            <button disabled={pending} className="h-10 rounded-b-md bg-zinc-950 border-2 border-zinc-800 text-white cursor-pointer hover:bg-zinc-800 hover:border-zinc-700 transition-colors duration-300">Envoyer</button>
        </form>
    )
}