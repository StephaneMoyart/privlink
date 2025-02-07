import { UserAvatar } from "@/components/user-avatar";
import { getSessionConversations } from "./conversations.actions"
import Link from "next/link";
import { Button } from "@/components/button";

const Page = async () => {
    const conversations = await getSessionConversations()
    console.log(conversations);


    return (
        <div className="flex flex-col gap-4">
            <div className="flex items-center p-4 border-b shadow -m-4 mb-0">
                <Button asChild>
                    <Link href={'/conversations/create'}>
                        Créer une conversation de groupe
                    </Link>
                </Button>
            </div>
            <div className="flex flex-col gap-4">
                {conversations.map(conversation => (
                    <Link className="flex items-center gap-2" href={`/conversations/${conversation._id}`} key={conversation._id}>
                        <div className="flex -space-x-5">
                            {conversation.members.map((member, index) => (
                                <UserAvatar
                                    key={member._id}
                                    className="w-15 h-15 rounded-full overflow-hidden"
                                    width={60}
                                    height={60}
                                    avatarUrl={conversation.members[index].avatarUrl}
                                />
                            ))}
                        </div>
                        {conversation.title
                            ?
                            <p>{conversation.title}</p>
                            :
                            <p>
                                <span>{conversation.members[0].firstname} </span>
                                <span>{conversation.members[0].lastname} </span>
                            </p>
                        }
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page