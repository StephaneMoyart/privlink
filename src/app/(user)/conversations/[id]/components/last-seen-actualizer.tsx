'use client'

import { useEffect } from "react"
import { updateLastSeenAction } from "../../conversations.actions"

type LastSeenActualizerProps = {
    conversationId: string
}

export const LastSeenActualizer: React.FC<LastSeenActualizerProps> = ({ conversationId }) => {
    useEffect(() => {
        updateLastSeenAction(conversationId)
    }, [conversationId])

    return null
}