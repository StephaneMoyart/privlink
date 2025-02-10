'use client'

import { useEffect } from "react"
import { updateLastSeenAction } from "../../conversations.actions"

export const LastSeenActualizer = ({ conversationId }) => {
    const conv = conversationId.toString()

    useEffect(() => {
        (async () => updateLastSeenAction(conv)) ()
    }, [conv])

    return (
        <div className="absolute"/>
    )
}