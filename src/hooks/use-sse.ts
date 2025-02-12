import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useSSE = () => {
    const router = useRouter()

    useEffect(() => {
        const eventSource = new EventSource('/api/sse')

        eventSource.onmessage = (event) => {
            const message = JSON.parse(event.data)

            if (message.message === 'newMessage') router.refresh()
        }

        eventSource.onerror = () => eventSource.close()

        return () => eventSource.close()
    }, [router])
}
