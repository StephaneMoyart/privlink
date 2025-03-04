import { CreateEventListForm } from "./event.forms"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({params}) => {
    const {id} = await params

    return (
        <div>
            {id}
            <p>Créer une liste</p>
            <CreateEventListForm eventId={id}/>
        </div>
    )
}

export default Page