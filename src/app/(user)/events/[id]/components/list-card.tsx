'use client'

import { Button } from "@/components/button"
import { ListT } from "../event.data"
import { AddEventItemForm } from "../event.forms"
import { ListItemCard } from "./list-item-card"
import { Trash } from "lucide-react"
import { useTransition } from "react"
import { deleteListAction } from "../event.actions"

type ListCardProps = {
    list: ListT
    sessionId: string
}

export const ListCard: React.FC<ListCardProps> = ({ list, sessionId }) => {
    const [pending, startTransition] = useTransition()

    return (
        <div className="flex flex-col gap-2 border border-stone-100 rounded-lg shadow">
            <div className="flex justify-between p-2 bg-stone-100 rounded-t-lg">
                <p>{list.title}</p>
                <div className="flex gap-2">
                    <AddEventItemForm listId={list.id}/>
                    <Button pending={pending} onClick={() => startTransition(() => deleteListAction(list.id))} icon color="red">
                        <Trash />
                    </Button>
                </div>
            </div>
            <div className="p-2">
                {list.items.map((item, index) => (
                    <ListItemCard key={index} item={item} sessionId={sessionId}/>
                ))}
            </div>
        </div>
    )
}