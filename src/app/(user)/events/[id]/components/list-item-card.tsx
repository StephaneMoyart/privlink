'use client'

import { useTransition } from "react"
import { ListItem } from "../event.data"
import { updateHandledByAction } from "../event.actions"

type ListItemCardProps = {
    item: ListItem
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ item }) => {
    const [, startTransition] = useTransition()
    const handledBy = item.handled_by?.id ? item.handled_by.id : null

    return (
        <>
            <p className="bg-blue-300 w-fit" onClick={() => startTransition(() => updateHandledByAction(item.id, handledBy))}>
                {item.title}
            </p>
            <p>handled by {item.handled_by?.firstname}</p>
        </>
    )
}