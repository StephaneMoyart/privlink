'use client'

import { useActionState, useState } from "react"
import { createGroupConversationAction } from "./create.actions"
import { Button } from "@/components/button"
import { InputWLabel } from "@/components/input-w-label"
import { Contact } from "@/data/get-contacts"
import { ContactSelector } from "@/feats/contact-selector/contact-selector"

type CreateGroupConversationFormProps = {
    contacts: Contact[]
}

export const CreateGroupConversationForm: React.FC<CreateGroupConversationFormProps> = ({ contacts }) => {
    const [members, setMembers] = useState<string[]>([])
    console.log(members);

    const [, action, pending] = useActionState(createGroupConversationAction.bind(null, members), null)

    return (
        <form className="flex flex-col gap-4" action={action}>
            <InputWLabel name={"title"} label={"Nom de la conversation"} />

            <p>Selectionnez des links (minimum 2):</p>

            <ContactSelector contacts={contacts} setMembers={setMembers}/>

            <Button
                disabled={members.length < 2 || pending}
                pending={pending}
            >
                Créer cette conversation
            </Button>
        </form>

    )
}