import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { CreateGroupConversationForm } from "./create.forms"
import { getContacts } from "@/data/get-contacts"

const Page = async () => {
    const contacts = await getContacts()

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