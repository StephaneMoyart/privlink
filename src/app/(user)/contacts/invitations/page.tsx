import { UserAvatar } from "@/components/user-avatar";
import { getContactInvitations } from "./invitations.actions"

const Page = async () => {
    const invitations = await getContactInvitations()
    console.log(invitations);


    return (
        <div>
            {invitations.map(({ _id, invitedByUser : {avatarUrl, firstname, lastname}}) => (
                <div key={_id} className="flex w-full justify-between p-4 bg-blue-200">
                    <div className="flex gap-2">
                        <div className="w-15 h-15 rounded-full overflow-hidden">
                            <UserAvatar avatarUrl={avatarUrl} width={60} height={60}/>
                        </div>
                        <div className="flex flex-col justify-center bg-pink-200">
                            <p>{firstname} {lastname}</p>
                            <p className="text-xs">vous propose de créer un Link</p>
                        </div>
                    </div>
                    <div className="bg-green-200">
                        test
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Page