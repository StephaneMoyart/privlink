import { getSelectedConversationAction } from "./conversation.actions"
import { NewMessageForm } from "./conversation.forms"
import { MessageCard } from "./components/message-card"
import { getSession } from "@/auth/session"
import { OptionsBar } from "@/components/options-bar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/button"
import Link from "next/link"
import { User } from "@/model"
import { QuitConversation } from "./components/quit-conversation"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params
    const { messages, title, members, multi, _id } = await getSelectedConversationAction(id)

    const session = await getSession()

    const otherMember = members.filter(member => member !== session._id.toString())

    const getFullName = async (stringId: string) => {
        const user = await User.findById(stringId).select('firstname lastname')
        return `${user.firstname} ${user.lastname}`
    }

    return (
        <div className="h-full flex flex-col  gap-4 justify-between">
            <OptionsBar className="flex justify-between">
                <Button asChild>
                    <Link href={'/conversations'}>
                        <ArrowLeft/> Retour
                    </Link>
                </Button>

                <p className="text-lg font-semibold">
                    { title ? title : getFullName(otherMember[0]) }
                </p>

                {multi
                ?
                <QuitConversation conversationId={ _id}/>
                :
                <span></span>
                }
            </OptionsBar>
            <div className="flex flex-col h-full overflow-y-scroll gap-4">
                {messages.map(message => (
                    <MessageCard key={message._id} message={message} conversationId={id} sessionId={session._id.toString()}/>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
        </div>
    )
}

export default Page