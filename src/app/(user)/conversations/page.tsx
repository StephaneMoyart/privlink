import { UserAvatar } from "@/components/user-avatar";
import { getSessionConversations } from "./conversations.actions"
import Link from "next/link";
import { Button } from "@/components/button";
import { OptionsBar } from "@/components/options-bar";
import { MessagesSquare, Plus } from "lucide-react";
import { getSession } from "@/auth/session";

const Page = async () => {
    const session = await getSession()
    const conversations = await getSessionConversations()
    console.log(conversations);
    console.log("lala", session._id);



    return (
        <div className="flex flex-col gap-4">
            <OptionsBar>
                <Button asChild>
                    <Link href={'/conversations/create'}>
                        <MessagesSquare/> <Plus/>
                    </Link>
                </Button>
            </OptionsBar>
            <div className="flex flex-col gap-4">
                {conversations.map(conversation => (
                    <Link className="flex items-center gap-4" href={`/conversations/${conversation._id}`} key={conversation._id.toString()}>
                        <div className="flex -space-x-5">
                            {conversation.members.map((member, index) => (
                                <UserAvatar
                                    key={member._id.toString()}
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
                        <p className="text-sm text-gray-500">
                            {conversation.lastAuthor === null ? "Pas encore" : conversation.lastAuthor.toString() === session._id.toString() ? "Envoyé" : "Reçu"}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page