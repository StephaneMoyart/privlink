import { getSelectedConversationAction } from "./conversation.actions"
import { NewMessageForm } from "./conversation.forms"
import { MessageCard } from "./components/message-card"
import { getSession } from "@/auth/session"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params
    const { messages } = await getSelectedConversationAction(id)

    const session = await getSession()

    return (
        <div className="h-full flex flex-col justify-between">
            <div className="flex flex-col h-full overflow-y-scroll mb-4 gap-4">
                {messages.map(message => (
                    <MessageCard key={message._id} message={message} conversationId={id} sessionId={session._id.toString()}/>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
        </div>
    )
}

export default Page