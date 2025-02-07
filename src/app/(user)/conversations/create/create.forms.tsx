'use client'

import { useActionState, useState } from "react"
import { createGroupConversationAction } from "./create.actions"
import { ContactCard } from "./components/contact-card"
import { Button } from "@/components/button"
import { InputWLabel } from "@/components/input-w-label"

export const CreateGroupConversationForm = ({ contacts }) => {
    const [members, setMembers] = useState([])
    const [state, action, pending] = useActionState(createGroupConversationAction.bind(null, members), null)

    console.log(members);


    return (
        <form className="flex flex-col gap-4" action={action}>
            <InputWLabel name={"title"} label={"Nom de la conversation"} />

            <p>Selectionnez des links (minimum 2):</p>

            {contacts.map(contact => (
                <ContactCard
                    setMembers={setMembers}
                    key={contact._id}
                    contact={contact}
                />
            ))}

            <Button
                disabled={members.length < 2 || pending}
                pending={pending}
            >
                Créer cette conversation
            </Button>
            {state?.success === false && <p className="text-red-500">{state.message}</p>}
        </form>

    )
}