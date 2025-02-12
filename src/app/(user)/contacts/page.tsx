import { SearchUserForm } from "./contact.forms"
import { UserAvatar } from "@/components/user-avatar"
import { ContactInvitation, User } from "@/model"
import { getSession } from "@/auth/session"
import { InvitationCountDisplayer } from "@/feats/invitation-count-displayer/invitation-count-displayer"
import { Types } from "mongoose"

type Contact = {
    _id: Types.ObjectId
    firstname: string
    lastname: string
    avatarUrl: string
}

const Page = async () => {
    const session = await getSession()
    const contacts: Contact[] = await User.find({ _id: { $in: session.contacts }}, ('firstname lastname avatarUrl'))
    const invitationsCount = await ContactInvitation.countDocuments({ invitedUser: session._id })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex md:items-center max-md:flex-col-reverse gap-4 justify-between w-full">
                <SearchUserForm/>
                <InvitationCountDisplayer count={invitationsCount} href={'/contacts/invitations'}/>
            </div>
            <div className="max-md:grid max-md:grid-cols-2 max-md:justify-center flex flex-wrap gap-4">
                {contacts.map(({ _id, firstname, lastname, avatarUrl}) => (
                    <div className="flex flex-col items-center gap-4 p-4 shadow shadow-black/20" key={ _id.toString()}>
                        <UserAvatar
                            className="w-40 h-40 md:h-50 md:w-50"
                            avatarUrl={avatarUrl}
                            width={200}
                            height={200}
                        />
                        <p>{firstname} {lastname}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page