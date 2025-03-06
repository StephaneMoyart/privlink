import { UserAvatar } from "@/components/user-avatar"
import { EventT } from "@/data/get-events"

type InvitedUsersProps = {
    invitedUsers: EventT['invited_users']
    sessionId: string
}

export const InvitedUsers: React.FC<InvitedUsersProps> = ({ invitedUsers, sessionId }) => {
    return (
        <>
            {invitedUsers.length > 0 &&
                <div className="flex items-center gap-2">
                    <p>En attente :</p>
                    <div className="flex -space-x-1">
                        {invitedUsers.map(({id, avatar}) => (
                            <UserAvatar key={id} className="w-6 h-6 rounded-full" avatar={avatar} height={24} width={24}/>
                        ))}
                    </div>
                    <div className="truncate">
                        {invitedUsers.map(({id, firstname}, index) => (
                            <span key={id}>
                                {id === sessionId ? "Moi" : firstname}
                                {index < invitedUsers.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}