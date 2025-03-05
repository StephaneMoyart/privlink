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

            <div className="gap-2 border border-stone-100 rounded-lg shadow">
                <div className="flex justify-between p-2 bg-stone-100 rounded-t-lg">
                    <p>Créer une liste</p>
                    <CreateEventListForm eventId={id}/>
                </div>
            </div>

            {participativeLists.map(list => (
                <ListCard key={list.id} list={list} sessionId={session.id}/>
            ))}
        </div>
    )
}

export default Page