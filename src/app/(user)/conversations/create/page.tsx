import { getSession } from "@/auth/session"
import { User } from "@/model"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CreateGroupConversationForm } from "./create.forms"

export type Contact = {
    _id: string
    firstname: string
    lastname: string
    avatarUrl: string
}

const Page = async () => {
    const session = await getSession()
    const contacts: Contact[] = (await User.find({ _id: { $in: session.contacts }}, ('_id firstname lastname avatarUrl'))).map(contact => contact.toJSON({ flattenObjectIds: true}))
    console.log(contacts);

    return (
        <div className="flex flex-col gap-6 ">
            <Link className="flex gap-2 w-fit" href={'/conversations'}>
                <span><ArrowLeft/></span>Retour
            </Link>

            <CreateGroupConversationForm contacts={contacts}/>
        </div>
    )
}

export default Page