'use client'

import { Button } from "@/components/button"
import { InputWLabel } from "@/components/input-w-label"
import { useActionState } from "react"
import { createEventListAction } from "./event.actions"
type CreateEventListFormProps = {
    eventId: string
}

export const CreateEventListForm: React.FC<CreateEventListFormProps> = ({ eventId }) => {
    const [, action, pending] = useActionState(createEventListAction.bind(null, eventId), null)

    return (
        <form action={action} className="flex">
            <InputWLabel name={"title"} label={"nom de la liste"}/>
            <Button
                pending={pending}
                disabled={pending}
            >
                Créer
            </Button>
        </form>
    )

}