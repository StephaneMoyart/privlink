import { NewMessageForm } from "./conversation.forms"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({ params }) => {
    const { id } = await params

    return (
        <div className="h-full relative">
            <div>
                {id}
            </div>
            <NewMessageForm conversationId={id}/>
        </div>
    )
}

export default Page