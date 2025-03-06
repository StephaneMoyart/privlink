'use client'

import { useTransition } from "react"
import { ListItem } from "../event.data"
import { deleteListItemAction, updateHandledByAction } from "../event.actions"
import { cn } from "@/lib/cn"
import { UserAvatar } from "@/components/user-avatar"

type ListItemCardProps = {
    item: ListItem
    sessionId: string
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ item, sessionId }) => {
    const [, startUpdateHandledByTransition] = useTransition()
    const [, startDeleteItemTransition] = useTransition()

    const handledBy = item.handled_by?.id ? item.handled_by.id : null
    const isDisabled = item.handled_by !== null && item.handled_by.id !== sessionId

    return (
        <div className="flex justify-between gap-2">
            <div
                className={cn("flex gap-2 py-1 px-2 rounded-full",
                    !handledBy && "hover:bg-stone-100",
                    handledBy && "bg-green-100"
                )}
            >
                <p
                    className={cn(
                        "w-fit",
                        !isDisabled && "cursor-pointer"
                    )}
                    onClick={() => !isDisabled && startUpdateHandledByTransition(() => updateHandledByAction(item.id, handledBy))}
                >
                    {item.title}
                </p>
                {handledBy &&
                    <UserAvatar className="h-6 w-6 rounded-full" height={24} width={24} avatar={item.handled_by?.avatar}/>
                }
            </div>
            <button
                className="flex justify-center items-center bg-red-100 p-1 h-full w-8 cursor-pointer rounded-full hover:bg-red-200"
                onClick={() => startDeleteItemTransition(() => deleteListItemAction(item.id))}
            >
                x
            </button>
        </div>
    )
}