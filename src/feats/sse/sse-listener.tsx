'use client'

import { useSSE } from "@/hooks/use-sse"

type SSEListenerProps = {
    signal: string
}

export const SSEListener: React.FC<SSEListenerProps> = ({ signal }) => {
    useSSE(signal)
    return null
}