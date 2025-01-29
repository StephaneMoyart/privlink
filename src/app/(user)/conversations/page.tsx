import { UserAvatar } from "@/components/user-avatar";
import { getSessionConversations } from "./conversations.actions"

const Page = async () => {
    const conversations = await getSessionConversations()
    console.log(conversations);


    return (
        <div className="flex flex-col gap-4">
            {conversations.map(conversation => (
                <div className="flex items-center gap-2" key={conversation._id}>
                    <div className="w-15 h-15 rounded-full overflow-hidden">
                        <UserAvatar width={60} height={60} avatarUrl={conversation.members[0].avatarUrl}/>
                    </div>
                    <p>
                        <span>{conversation.members[0].firstname} </span>
                        <span>{conversation.members[0].lastname} </span>
                    </p>
                </div>
            ))}
        </div>
    )
}

export default Page