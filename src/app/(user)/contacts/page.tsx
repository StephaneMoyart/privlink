import Link from "next/link"
import { SearchUserForm } from "./contact.forms"

const Page = () => {
    return (
        <div className="flex justify-between w-full">
            <SearchUserForm/>
            <Link href={'/contacts/invitations'} className="bg-green-200">
                Invitation
            </Link>
        </div>
    )
}

export default Page