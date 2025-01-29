import { UserAvatar } from "@/components/user-avatar"
import { getSelectedConversationAction } from "./conversation.actions"
import { NewMessageForm } from "./conversation.forms"
import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { MessageSettings } from "./components/settings-buttons"

type PageProps = {
    params: Promise<{id: string}>
}


const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params
    const { messages } = await getSelectedConversationAction(id)

    const session = await getSessionOrRedirect()

    const isOwned = (sessionId, authorId) => !!sessionId.equals(authorId)

    return (
        <div className="h-full relative">
            <div className="flex flex-col gap-4">
                {messages.map(message => (
                    <div className="flex gap-2 justify-between" key={message.id}>
                        <div className="flex gap-2">
                            <div className="w-15 h-15 rounded-full overflow-hidden">
                                <UserAvatar width={60} height={60} avatarUrl={message.author.avatarUrl}/>
                            </div>
                            <div>
                                <p className="font-bold bg-amber-300">
                                    <span>{message.author.firstname} </span>
                                    <span>{message.author.lastname}</span>
                                </p>
                                <p>
                                    {message.content}
                                </p>
                            </div>
                        </div>
                        <div>
                            {isOwned(session._id, message.author._id) &&
                                <MessageSettings conversationId={id} messageId={message._id}/>
                            }
                        </div>
                    </div>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
        </div>
    )
}

export default Page