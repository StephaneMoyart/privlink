import { newMessageEventEmitter } from '@/feats/sse/new-message/event-emitter'
import { NextResponse } from 'next/server'

export async function GET() {
    const stream = new ReadableStream({
        start(controller) {
            const encoder = new TextEncoder()

            const push = (data: string) => controller.enqueue(encoder.encode(`data: ${data}\n\n`))

            const onNewMessage = async (message: string) => push(JSON.stringify(message))

            newMessageEventEmitter.on('newMessage', onNewMessage)
        }
    })

    return new NextResponse(stream, {
        headers: {
            'Content-Type': 'text/event-stream',
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
        },
    })
}