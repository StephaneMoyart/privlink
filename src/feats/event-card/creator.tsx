import { UserAvatar } from "@/components/user-avatar"
import { EventT } from "@/data/get-events"

type CreatorProps = Pick<EventT, 'creator'> & {
    sessionId: string
}

export const Creator: React.FC<CreatorProps> = ({ creator, sessionId }) => {
    const isCreator = sessionId === creator.id

    return (
        <div className="flex items-center gap-2">
            <p>Créé par :</p>
            <UserAvatar className="w-6 h-6 rounded-full" avatar={creator.avatar} height={24} width={24}/>
            {isCreator
                ?
                <p>Moi</p>
                :
                <p>{creator.firstname} {creator.lastname}</p>
            }
        </div>
    )
}