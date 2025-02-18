import { CreateEventForm } from "./create.forms";
import { getContacts } from "@/data/get-contacts";

const Page = async () => {
    const contacts = await getContacts()

    return (
        <CreateEventForm contacts={contacts}/>
    )
}

export default Page