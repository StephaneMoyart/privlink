import { UserAvatar } from "@/components/user-avatar";
import Link from "next/link";
import { Button } from "@/components/button";
import { OptionsBar } from "@/components/options-bar";
import { MessagesSquare, Plus } from "lucide-react";
import { getSession } from "@/auth/session";
import { formatMessageDateAndTime } from "@/lib/format-message-date";
import { Badge } from "@/components/badge";
import { countNewMessages, getSessionConversations } from "./conversations.data";

const Page = async () => {
    const session = await getSession()
    const conversations = await getSessionConversations()
    const newMessagesCounts = await countNewMessages()

    const getCount = (id: string) => {
        const result = newMessagesCounts.filter(count => count.conversation_id === id)
        return result[0].last_seen_number
    }

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
                {conversations.map(({ id, members, title, last_author, updated_at }) => (
                    <Link
                        className="flex items-center gap-4"
                        href={`/conversations/${id}`}
                        key={id}
                    >
                        <div className="flex -space-x-5">
                            {members.map((member) => (
                                <UserAvatar
                                    key={member.id}
                                    className="w-15 h-15 rounded-full overflow-hidden"
                                    width={60}
                                    height={60}
                                    avatar={member.avatar}
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

                        { getCount(id) > 0 &&
                            <Badge color="green" size="xsmall">
                                {getCount(id)} Nouv
                            </Badge>
                        }
                        <p className="text-sm text-gray-500 lowercase">
                            {last_author === null ? "aucun message" : last_author === session.id ? "envoyé " : "reçu "}
                            {last_author !== null && formatMessageDateAndTime(updated_at)}
                        </p>
                    </Link>
                ))}
            </div>
        </div>
    )
}

export default Page