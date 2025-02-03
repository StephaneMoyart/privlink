'use client'

import { useActionState } from "react"
import { signUpAction } from "./signup.actions"
import { InputWLabel } from "@/components/input"
import { Button } from "@/components/button"

export const SignUpForm = () => {
    const [state, action, pending] = useActionState(signUpAction, null)

    return (
        <form action={action} className="flex flex-col gap-4 w-full">
            <InputWLabel name="firstname" label="PRENOM" state={state}/>
            <InputWLabel name="lastname" label="NOM" state={state}/>
            <InputWLabel name="email" label="EMAIL" type="email" state={state}/>
            <InputWLabel name="password" label="MOT DE PASSE" type="password" state={state}/>
            <InputWLabel name="confirmPassword" label="CONFIRMATION MOT DE PASSE" type="password" state={state}/>
            <Button
                className="h-12"
                disabled={pending}
                pending={pending}
            >
                Valider
            </Button>
        </form>
    )
}