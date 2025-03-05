'use client'

import { useTransition } from "react"
import { ListItem } from "../event.data"
import { updateHandledByAction } from "../event.actions"
import { cn } from "@/lib/cn"
import { UserAvatar } from "@/components/user-avatar"

type ListItemCardProps = {
    item: ListItem
    sessionId: string
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ item, sessionId }) => {
    const [, startTransition] = useTransition()
    const handledBy = item.handled_by?.id ? item.handled_by.id : null
    const isDisabled = item.handled_by !== null && item.handled_by.id !== sessionId

    return (
        <div className="flex gap-2">
            <p
                className={cn(
                    "w-fit",
                    handledBy && "line-through",
                    !isDisabled && "cursor-pointer"
                )}
                onClick={() => !isDisabled && startTransition(() => updateHandledByAction(item.id, handledBy))}
            >
                {item.title}
            </p>
            {handledBy &&
                <UserAvatar className="h-6 w-6 rounded-full" height={24} width={24} avatar={item.handled_by?.avatar}/>
            }
            <p className="bg-red-200">x</p>
        </div>
    )
}