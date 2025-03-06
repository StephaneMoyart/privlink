import { getSession } from "@/auth/session"
import { getParticipativeListsWithItems } from "./event.data"
import { CreateEventListForm } from "./event.forms"
import { ListCard } from "./components/list-card"
import { getEvent } from "@/data/get-event"
import { handleEventDateDisplay } from "@/lib/format-event-card-date"
import { Creator } from "@/feats/event-card/creator"
import { Participants } from "@/feats/event-card/participants"
import { InvitedUsers } from "@/feats/event-card/invited-users"

type PageProps = {
    params: Promise<{id: string}>
}

const Page: React.FC<PageProps> = async ({params}) => {
    const {id: pId} = await params

    const [session, event, participativeLists] = await Promise.all([
        getSession(),
        getEvent(pId),
        getParticipativeListsWithItems(pId)
    ])

    const { id, title, description, start_date, end_date, is_full_day, creator, participants, invited_users } = event
    const date = handleEventDateDisplay(start_date, end_date, is_full_day)

    return (
        <div className="flex flex-col gap-2">
            <h1 className="font-semibold">{title}</h1>
            <p>{description}</p>
            <p>{date}</p>

            <Creator creator={creator} sessionId={session.id}/>

            <Participants participants={participants} sessionId={session.id} />

            <InvitedUsers invitedUsers={invited_users} sessionId={session.id}/>

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