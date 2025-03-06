import { UserAvatar } from "@/components/user-avatar"
import { EventT } from "@/data/get-events"

type CreatorProps = Pick<EventT, 'creator'> & {
    sessionId: string
}

export const Creator: React.FC<CreatorProps> = ({ creator, sessionId }) => {
    const { id, avatar, firstname, lastname } = creator
    const isCreator = sessionId === id

    return (
        <div className="flex items-center gap-2">
            <p>Créé par :</p>
            <UserAvatar className="w-6 h-6 rounded-full" avatar={avatar} height={24} width={24}/>
            {isCreator
                ?
                <p>Moi</p>
                :
                <p>{firstname} {lastname}</p>
            }
        </div>
    )
}