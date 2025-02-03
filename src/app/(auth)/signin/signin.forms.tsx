'use client'

import { InputWLabel } from "@/components/input"
import { useActionState } from "react"
import { signInAction } from "./signin.actions"
import { Button } from "@/components/button"

export const SignInForm = () => {
    const [state, action, pending] = useActionState(signInAction, null)

    return (
        <form action={action} className="flex flex-col gap-4 w-full">
            <InputWLabel name="email" label="EMAIL" type="email" state={state}/>
            <InputWLabel name="password" label="MOT DE PASSE" type="password" state={state}/>
            {state?.message && <p>{state.message}</p>}
            <Button
                className="h-12"
                disabled={pending}
                pending={pending}
                type="submit"
            >
                Connexion
            </Button>
        </form>
    )
}