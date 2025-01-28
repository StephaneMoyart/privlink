import Link from "next/link"
import { SearchUserForm } from "./contact.forms"
import { getSessionContacts } from "./contact.actions"
import { UserAvatar } from "@/components/user-avatar"

const Page = async () => {
    const contacts = await getSessionContacts()
    console.log(contacts);

    return (
        <div className="flex flex-col gap-4">
            <div className="flex justify-between w-full">
                <SearchUserForm/>
                <Link href={'/contacts/invitations'} className="bg-green-200">
                    Invitation
                </Link>
            </div>
            <div className="flex gap-4">
                {contacts.map(contact => (
                    <div className="flex flex-col items-center gap-4 p-4 shadow shadow-black/20" key={contact._id}>
                        <div className="w-50 h-50">
                            <UserAvatar avatarUrl={contact.avatarUrl} width={200} height={200}/>
                        </div>
                        <p>{contact.firstname} {contact.lastname}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Page