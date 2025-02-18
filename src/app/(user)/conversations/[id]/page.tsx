import { NewMessageForm } from "./conversation.forms"
import { MessageCard } from "./components/message-card"
import { getSession } from "@/auth/session"
import { OptionsBar } from "@/components/options-bar"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/button"
import Link from "next/link"
import { QuitConversation } from "./components/quit-conversation"
import { redirect } from "next/navigation"
import { LastSeenActualizer } from "./components/last-seen-actualizer"
import { SSEListener } from "@/feats/sse/sse-listener"
import { getSelectedConversation } from "./conversation.data"

// export type PopulatedAuthor = {
//     _id: string
//     firstname: string
//     lastname: string
//     avatarUrl: string
// }

// type Conv = Omit<CustomConversationT, 'messages'> & {
//     messages: {
//         _id: string,
//         author: PopulatedAuthor
//         content: string
//         date: NativeDate
//     }[]
// }

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id: pId } = await params

    const conversation = await getSelectedConversation(pId)
    console.log(conversation);

    if (!conversation) return null

    const { messages, title, members, multi, id } = conversation[0]
    console.log(messages);
    console.log(members);


    //Shield
    const session = await getSession()

    // if (!members.includes(session.id)) redirect('/conversations')
    // //shield

    const otherMember = members.filter(member => member !== session.id)

    // const getFullName = async (stringId: string) => {
    //     const user = await User.findById(stringId).select('firstname lastname')
    //     if (!user) return "user unknown"
    //     const {firstname, lastname} = user
    //     return `${firstname} ${lastname}`
    // }

    return (
        <div className="h-full flex flex-col  gap-4 justify-between">
            <OptionsBar className="flex justify-between">
                <Button asChild>
                    <Link href={'/conversations'}>
                        <ArrowLeft/> Retour
                    </Link>
                </Button>

                <p className="text-lg font-semibold">
                    { title ? title : `${members[0].firstname} ${members[0].lastname}` }
                </p>

                {multi
                ?
                <QuitConversation conversationId={id}/>
                :
                <span></span>
                }
            </OptionsBar>
            <div className="flex flex-col h-full overflow-y-scroll gap-4">
                {messages.map(message => (
                    <MessageCard key={message.id} message={message} conversationId={id} sessionId={session.id}/>
                ))}
            </div>
            <NewMessageForm conversationId={id}/>
            <LastSeenActualizer conversationId={id}/>
            <SSEListener/>
        </div>
    )
}

export default Page