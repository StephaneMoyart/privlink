import { ListT } from "../event.data"
import { AddEventItemForm } from "../event.forms"
import { ListItemCard } from "./list-item-card"

type ListCardProps = {
    list: ListT
    sessionId: string
}

export const ListCard: React.FC<ListCardProps> = ({ list, sessionId }) => {
    return (
        <div className="flex flex-col gap-2 border border-stone-100 rounded-lg shadow">
            <div className="flex justify-between p-2 bg-stone-100 rounded-t-lg">
                <p>{list.title}</p>
                <AddEventItemForm listId={list.id}/>
            </div>
            <div className="p-2">
                {list.items.map((item, index) => (
                    <ListItemCard key={index} item={item} sessionId={sessionId}/>
                ))}
            </div>
        </div>
    )
}