import { getSelectedConversationAction } from "./conversation.actions"
import { NewMessageForm } from "./conversation.forms"
import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { MessageCard } from "./components/message-card"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params
    const { messages } = await getSelectedConversationAction(id)


    const session = await getSessionOrRedirect()

    return (
        <div className="h-full relative">
            <div className="flex flex-col gap-4">
                {messages.map(message => (
                    <MessageCard key={message._id} message={message} conversationId={id} sessionId={session._id.toString()}/>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
        </div>
    )
}

export default Page