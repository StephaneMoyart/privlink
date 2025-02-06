import Link from "next/link"
import { SearchUserForm } from "./contact.forms"
import { UserAvatar } from "@/components/user-avatar"
import { ContactInvitation, User } from "@/model"
import { getSession } from "@/auth/session"

const Page = async () => {
    const session = await getSession()
    const contacts = await User.find({ _id: { $in: session.contacts }}, ('firstname lastname avatarUrl'))
    const invitationsCount = await ContactInvitation.countDocuments({ invitedUser: session._id })

    return (
        <div className="flex flex-col gap-4">
            <div className="flex md:items-center max-md:flex-col-reverse gap-4 justify-between w-full">
                <SearchUserForm/>
                {invitationsCount > 0
                    ?
                    <Link href={'/contacts/invitations'}>
                        <p className="flex justify-center items-center gap-2">
                            {<span className="flex justify-center items-center w-7 h-7 rounded-full bg-black text-white">{invitationsCount}</span>}{`Invitation${invitationsCount === 1 ? "" :"s"}`}
                        </p>
                    </Link>
                    :
                    <p className="text-black/50 italic">Pas d&apos;invitation reçue</p>
                }
            </div>
            <div className="max-md:grid max-md:grid-cols-2 max-md:justify-center flex flex-wrap gap-4">
                {contacts.map(contact => (
                    <div className="flex flex-col items-center gap-4 p-4 shadow shadow-black/20" key={contact._id}>
                        <UserAvatar
                            className="w-40 h-40 md:h-50 md:w-50"
                            avatarUrl={contact.avatarUrl}
                            width={200}
                            height={200}
                        />
                        <p>{contact.firstname} {contact.lastname}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page