import { UserAvatar } from "@/components/user-avatar"
import { getSelectedConversationAction } from "./conversation.actions"
import { NewMessageForm } from "./conversation.forms"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params
    const { messages } = await getSelectedConversationAction(id)

    return (
        <div className="h-full relative">
            <div className="flex flex-col gap-4">
                {messages.map(message => (
                    <div className="flex gap-2" key={message.id}>
                        <div className="w-15 h-15 rounded-full overflow-hidden">
                            <UserAvatar width={60} height={60} avatarUrl={message.author.avatarUrl}/>
                        </div>
                        <div>
                            <p>
                                <span>{message.author.firstname}</span>
                                <span>{message.author.lastname}</span>
                            </p>
                            <p>
                                {message.content}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
        </div>
    )
}

export default Page