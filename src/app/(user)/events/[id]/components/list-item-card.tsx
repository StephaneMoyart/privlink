'use client'

import { useTransition } from "react"
import { ListItem } from "../event.data"
import { updateHandledByAction } from "../event.actions"

type ListItemCardProps = {
    item: ListItem
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ item }) => {
    console.log(item);
    const [, startTransition] = useTransition()

    return (
        <>
            <p className="bg-blue-300 w-fit" onClick={() => startTransition(() => updateHandledByAction(item.id))}>
                {item.title}
            </p>
            <p>handled by {item.handled_by?.firstname}</p>
        </>
    )
}