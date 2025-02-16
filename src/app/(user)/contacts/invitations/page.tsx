import { UserAvatar } from "@/components/user-avatar";
import { getContactInvitations } from "./invitations.actions"
import { AcceptOrDeclineInvitation } from "./components/accept-or-decline-invitation";
import { redirect } from "next/navigation";

const Page = async () => {
    const invitations = await getContactInvitations()

    if (invitations.length === 0) redirect('/contacts')

    return (
        <div>
            {invitations.map(({ id, invitedByUser : { id: invitedByUserId, avatarUrl, firstname, lastname }}) => (
                <div key={id} className="flex w-full justify-between p-4">
                    <div className="flex gap-2">
                        <UserAvatar
                            className="w-15 h-15 rounded-full"
                            avatarUrl={avatarUrl}
                            width={60}
                            height={60}
                        />
                        <div className="flex flex-col justify-center">
                            <p>{firstname} {lastname}</p>
                            <p className="text-xs">vous propose de créer un Link</p>
                        </div>
                    </div>
                    <AcceptOrDeclineInvitation invitedByUserId={invitedByUserId} invitationId={id}/>
                </div>
            ))}
        </div>
    )
}

export default Page