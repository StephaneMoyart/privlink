import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export const useSSE = (signal: string) => {
    const router = useRouter()

    useEffect(() => {
        const eventSource = new EventSource('/api/sse')

        eventSource.addEventListener(signal, () => router.refresh())

        eventSource.onerror = () => eventSource.close()

        return () => eventSource.close()
    }, [router, signal])
}