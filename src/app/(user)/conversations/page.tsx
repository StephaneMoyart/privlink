import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { Button } from "@/components/button";
import { OptionsBar } from "@/components/options-bar";
import { MessagesSquare, Plus } from "lucide-react";
import { getSession } from "@/auth/session";
import { formatMessageDateAndTime } from "@/lib/format-message-date";
import { Badge } from "@/components/badge";
import { getSessionConversations } from "./conversations.data";

const Page = async () => {
    const session = await getSession()
    const conversations = await getSessionConversations()
    console.log('loglog', conversations);


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
                {conversations.map(({_id, members, title, lastAuthor, updatedAt}) => (
                    <Link
                        className="flex items-center gap-4"
                        href={`/conversations/${ _id}`}
                        key={ _id.toString()}
                    >
                        <div className="flex -space-x-5">
                            {members.map((member, index) => (
                                <UserAvatar
                                    key={member._id}
                                    className="w-15 h-15 rounded-full overflow-hidden"
                                    width={60}
                                    height={60}
                                    avatarUrl={members[index].avatarUrl}
                                />
                            ))}
                        </div>
                        {title
                            ?
                            <p>{title}</p>
                            :
                            <p>
                                <span>{members[0].firstname} </span>
                                <span>{members[0].lastname} </span>
                            </p>
                        }
                        <Badge color="green" size="xsmall">
                            Nouv
                        </Badge>
                        <p className="text-sm text-gray-500 lowercase">
                            {lastAuthor === null ? "aucun message" : lastAuthor === session.id ? "envoyé " : "reçu "}
                            {lastAuthor !== null && formatMessageDateAndTime(updatedAt)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page