import { getSession } from "@/auth/session"
import { getParticipativeListsWithItems } from "./event.data"
import { CreateEventListForm } from "./event.forms"
import { ListCard } from "./components/list-card"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({params}) => {
    const {id} = await params
    const session = await getSession()

    const participativeLists = await getParticipativeListsWithItems(id)

    return (
        <div className="flex flex-col gap-2">
            {id}
            <p>Créer une liste</p>
            <CreateEventListForm eventId={id}/>

            {participativeLists.map(list => (
                <ListCard key={list.id} list={list} sessionId={session.id}/>
            ))}
        </div>
    )
}

export default Page