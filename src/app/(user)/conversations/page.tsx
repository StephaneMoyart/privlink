import { UserAvatar } from "@/components/user-avatar";
import { getSessionConversations } from "./conversations.actions"
import Link from "next/link";

const Page = async () => {
    const conversations = await getSessionConversations()
    console.log(conversations);


    return (
        <div className="flex flex-col gap-4">
            {conversations.map(conversation => (
                    <Link className="flex items-center gap-2" href={`/conversations/${conversation._id}`} key={conversation._id}>
                        <UserAvatar
                            className="w-15 h-15 rounded-full overflow-hidden"
                            width={60}
                            height={60}
                            avatarUrl={conversation.members[0].avatarUrl}
                        />
                        <p>
                            <span>{conversation.members[0].firstname} </span>
                            <span>{conversation.members[0].lastname} </span>
                        </p>
                    </Link>
            ))}
        </div>
    )
}

export default Page