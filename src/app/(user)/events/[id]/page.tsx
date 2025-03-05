import { getSession } from "@/auth/session"
import { ListItemCard } from "./components/list-item-card"
import { getParticipativeListsWithItems } from "./event.data"
import { AddEventItemForm, CreateEventListForm } from "./event.forms"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({params}) => {
    const {id} = await params
    const session = await getSession()

    const participativeLists = await getParticipativeListsWithItems(id)

    return (
        <div>
            {id}
            <p>Créer une liste</p>
            <CreateEventListForm eventId={id}/>

            {participativeLists.map(list => (
                <div key={list.id}>
                    <p>{list.title}</p>
                    <AddEventItemForm listId={list.id}/>
                    <div>
                        {list.items.map((item, index) => (
                            <ListItemCard key={index} item={item} sessionId={session.id}/>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page