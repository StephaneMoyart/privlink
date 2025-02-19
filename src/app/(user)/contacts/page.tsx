import { SearchUserForm } from "./contact.forms"
import { UserAvatar } from "@/components/user-avatar"
import { getContacts } from "@/data/get-contacts"
import { getInvitationsCount } from "@/data/get-invitation-count"
import { InvitationCountDisplayer } from "@/feats/invitation-count-displayer/invitation-count-displayer"

const Page = async () => {
    const contacts = await getContacts()
    const count = await getInvitationsCount()

    return (
        <div className="flex flex-col gap-4">
            <div className="flex md:items-center max-md:flex-col-reverse gap-4 justify-between w-full">
                <SearchUserForm/>
                <InvitationCountDisplayer count={count} href={'/contacts/invitations'}/>
            </div>
            <div className="max-md:grid max-md:grid-cols-2 max-md:justify-center flex flex-wrap gap-4">
                {contacts.map(({ id, firstname, lastname, avatar}) => (
                    <div className="flex flex-col items-center gap-4 p-4 shadow shadow-black/20" key={ id}>
                        <UserAvatar
                            className="w-40 h-40 md:h-50 md:w-50"
                            avatar={avatar}
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