import { NewMessageForm } from "./conversation.forms"
import { MessageCard } from "./components/message-card"
import { getSession } from "@/auth/session"
import { OptionsBar } from "@/components/options-bar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/button"
import Link from "next/link"
import { Conversation, User } from "@/model"
import { QuitConversation } from "./components/quit-conversation"
import { redirect } from "next/navigation"
import { LastSeenActualizer } from "./components/last-seen-actualizer"
import { SSEListener } from "@/feats/sse/sse-listener"
import { FlattenedConversation } from "@/model/conversation"

export type PopulatedAuthor = {
    _id: string
    firstname: string
    lastname: string
    avatarUrl: string
}

type Conv = Omit<FlattenedConversation, 'messages'> & {
    messages: {
        _id: string,
        author: PopulatedAuthor
        content: string
        date: NativeDate
    }[]
}

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params

    //find a way to not use as unknown
    const conversation = (await Conversation.findById(id).populate<PopulatedAuthor>('messages.author', '_id firstname lastname avatarUrl'))?.toJSON({flattenObjectIds: true}) as unknown as Conv
    if (!conversation) return null

    const { messages, title, members, multi, _id } = conversation

    //Shield
    const session = await getSession()

    if (!members.includes(session._id.toString())) redirect('/conversations')
    //shield

    const otherMember = members.filter(member => member !== session._id.toString())

    const getFullName = async (stringId: string) => {
        const user = await User.findById(stringId).select('firstname lastname')
        if (!user) return "user unknown"
        const {firstname, lastname} = user
        return `${firstname} ${lastname}`
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
                    <MessageCard key={message._id.toString()} message={message} conversationId={id} sessionId={session._id.toString()}/>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
            <LastSeenActualizer conversationId={ _id}/>
            <SSEListener/>
        </div>
    )
}

export default Page