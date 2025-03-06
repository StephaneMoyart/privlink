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
                        {invitedUsers.map(user => (
                            <UserAvatar key={user.id} className="w-6 h-6 rounded-full" avatar={user.avatar} height={24} width={24}/>
                        ))}
                    </div>
                    <div className="truncate">
                        {invitedUsers.map((user, index) => (
                            <span key={user.id}>
                                {user.id === sessionId ? "Moi" : user.firstname}
                                {index < invitedUsers.length - 1 && ", "}
                            </span>
                        ))}
                    </div>
                </div>
            }
        </>
    )
}