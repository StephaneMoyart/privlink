import { ListItem } from "../event.data"

type ListItemCardProps = {
    item: ListItem
}

export const ListItemCard: React.FC<ListItemCardProps> = ({ item }) => {
    console.log(item);


    return (
        <p>
            {item.title}
        </p>
    )
}