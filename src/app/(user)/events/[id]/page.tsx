import { getParticipativeListsWithItems } from "./event.data"
import { CreateEventListForm } from "./event.forms"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({params}) => {
    const {id} = await params

    const participativeLists = await getParticipativeListsWithItems(id)

    return (
        <div>
            {id}
            <p>Créer une liste</p>
            <CreateEventListForm eventId={id}/>

            {participativeLists.map(list => (
                <div key={list.id}>
                    <p>{list.title}</p>
                </div>
            ))}
        </div>
    )
}

export default Page