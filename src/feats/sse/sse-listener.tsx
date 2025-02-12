'use client'

import { useSSE } from "@/hooks/use-sse"

export const SSEListener = () => {
    useSSE()
    return null
}