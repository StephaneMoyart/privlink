'use client'

import { Button } from "@/components/button"
import { InputWLabel } from "@/components/input-w-label"
import { useActionState } from "react"
import { addEventItemAction, createEventListAction } from "./event.actions"
type CreateEventListFormProps = {
    eventId: string
}

type AddEventItemFormProps = {
    listId: string
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

export const AddEventItemForm: React.FC<AddEventItemFormProps> = ({ listId }) => {
    const [, action, pending] = useActionState(addEventItemAction.bind(null, listId), null)

    return (
        <form action={action} className="flex">
            <InputWLabel name={`${listId}itemTitle`} label={"Ajouter un item"}/>
            <Button
                pending={pending}
                disabled={pending}
            >
                +
            </Button>
        </form>
    )
}