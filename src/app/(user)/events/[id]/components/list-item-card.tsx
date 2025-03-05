'use client'

import { useTransition } from "react"
import { ListItem } from "../event.data"
import { updateHandledByAction } from "../event.actions"
import { cn } from "@/lib/cn"

type ListItemCardProps = {
    item: ListItem
    sessionId: string
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ item, sessionId }) => {
    const [, startTransition] = useTransition()
    const handledBy = item.handled_by?.id ? item.handled_by.id : null
    const isDisabled = item.handled_by !== null && item.handled_by.id !== sessionId

    return (
        <>
            <p
                className={cn(
                    "bg-blue-300 w-fit",
                    !isDisabled && "cursor-pointer"
                )}
                onClick={() => !isDisabled && startTransition(() => updateHandledByAction(item.id, handledBy))}
            >
                {item.title}
            </p>
            <p>handled by {item.handled_by?.firstname}</p>
        </>
    )
}