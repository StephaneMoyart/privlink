import { Contact } from "@/feats/contact-selector/contact-selector";
import { CreateEventForm } from "./create.forms";
import { getSession } from "@/auth/session";
import { User } from "@/model";

const Page = async () => {
    const session = await getSession()
    const contacts: Contact[] = (await User.find({ _id: { $in: session.contacts }}, ('_id firstname lastname avatarUrl'))).map(contact => contact.toJSON({ flattenObjectIds: true}))

    return (
        <CreateEventForm contacts={contacts}/>
    )
}

export default Page