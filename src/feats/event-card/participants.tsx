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
                        {participants.map(participant => (
                            <UserAvatar key={participant.id} className="w-6 h-6 rounded-full" avatar={participant.avatar} height={24} width={24}/>
                        ))}
                    </div>
                    <div className="truncate">
                        {participants.map((participant, index) => (
                            <span key={index}>
                                {(participant.id === sessionId) ? "Moi" : participant.firstname}
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