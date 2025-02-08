'use client'

import { Button } from "@/components/button"
import { useTransition } from "react"
import { quitConversationAction } from "../conversation.actions"

export const QuitConversation = ({ conversationId }) => {
    const [pending, startTransition] = useTransition()

    return (
        <Button
            pending={pending}
            disabled={pending}
            onClick={() => startTransition(() => quitConversationAction(conversationId))}
        >
            Quitter
        </Button>
    )
}