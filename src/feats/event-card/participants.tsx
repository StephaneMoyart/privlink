import { UserAvatar } from "@/components/user-avatar"
import { EventT } from "@/data/get-events"

type ParticipantsProps = Pick<EventT, 'participants'> & {
    sessionId: string
}

export const Participants: React.FC<ParticipantsProps> = ({participants, sessionId}) => {
    return (
        <>
            {participants.length > 0
                ?
                <div className="flex items-center gap-2">
                    <p>Participants :</p>
                    <div className="flex -space-x-1">
                        {participants.map(({id, avatar}) => (
                            <UserAvatar key={id} className="w-6 h-6 rounded-full" avatar={avatar} height={24} width={24}/>
                        ))}
                    </div>
                    <div className="truncate">
                        {participants.map(({id, firstname}, index) => (
                            <span key={index}>
                                {(id === sessionId) ? "Moi" : firstname}
                                {index < participants.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                </div>
                :
                <p>Pas d&apos;autres participants</p>
            }
        </>
    )
}