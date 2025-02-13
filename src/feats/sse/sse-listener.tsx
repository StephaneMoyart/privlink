'use client'

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export const SSEListener = () => {
    const router = useRouter()

    useEffect(() => {
        const eventSource = new EventSource('/api/sse')

        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data)

            if (message.message === 'refresh') router.refresh()
        }

        eventSource.onerror = () => eventSource.close()

        return () => eventSource.close()
    }, [router])

    return null
}