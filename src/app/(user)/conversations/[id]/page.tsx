import { NewMessageForm } from "./conversation.forms"
import { MessageCard } from "./components/message-card"
import { getSession } from "@/auth/session"
import { OptionsBar } from "@/components/options-bar"
import { ArrowDown, ArrowLeft } from "lucide-react"
import { Button } from "@/components/button"
import Link from "next/link"
import { QuitConversation } from "./components/quit-conversation"
import { redirect } from "next/navigation"
import { LastSeenActualizer } from "./components/last-seen-actualizer"
import { SSEListener } from "@/feats/sse/sse-listener"
import { getSelectedConversation } from "./conversation.data"
import { EditConversationNameDialog } from "./components/edit-conversation-name-dialog"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id: pId } = await params

    const conversation = await getSelectedConversation(pId)

    if (!conversation) return null

    const { messages, title, members, multi, id } = conversation[0]

    //Shield
    const session = await getSession()

    if (!members.some(member => member.id === session.id)) return redirect('/conversations')
    // //shield

    const conversationWith = members.filter(member => member.id !== session.id)

    return (
        <div className="h-full flex flex-col  gap-4 justify-between">
            <OptionsBar className="flex justify-between">
                <Button asChild>
                    <Link href={'/conversations'}>
                        <ArrowLeft/> Retour
                    </Link>
                </Button>

                <p className="text-lg font-semibold">
                    { title ? title : `${conversationWith[0].firstname} ${conversationWith[0].lastname}` }
                </p>

                <div className="flex gap-2">
                    <EditConversationNameDialog conversationId={id} />
                    {multi ? <QuitConversation conversationId={id}/> : <span></span> }
                </div>

            </OptionsBar>
            <div className="flex flex-col h-full overflow-y-scroll gap-4">
                {messages.length > 0
                    ?
                    messages.map(message => (
                        <MessageCard key={message.id} message={message} sessionId={session.id}/>
                    ))
                    :
                    <div className="flex flex-col gap-2 justify-center items-center w-full h-full">
                        <p>Aucun message dans cette conversation.</p>
                        <p>Dites quelque chose à {multi ? "vos contacts :" : `${conversationWith[0].firstname} :` }</p>
                        <ArrowDown size={40}/>
                    </div>
                }
            </div>
            <NewMessageForm conversationId={id}/>
            <LastSeenActualizer conversationId={id}/>
            <SSEListener/>
        </div>
    )
}

export default Page