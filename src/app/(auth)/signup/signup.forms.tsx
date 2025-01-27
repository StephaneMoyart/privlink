'use client'

import { useActionState } from "react"
import { signUpAction } from "./signup.actions"
import { InputWLabel } from "@/components/input"

export const SignUpForm = () => {
    const [, action, pending] = useActionState(signUpAction, null)

    return (
        <form action={action} className="flex flex-col gap-4 w-full">
            <InputWLabel name="firstname" label="PRENOM"/>
            <InputWLabel name="lastname" label="NOM"/>
            <InputWLabel name="email" label="EMAIL" type="email"/>
            <InputWLabel name="password" label="MOT DE PASSE" type="password"/>
            <InputWLabel name="confirmPassword" label="CONFIRMATION MOT DE PASSE" type="password"/>
            <button
                className="h-12 px-4 bg-zinc-950 ring-2 ring-zinc-800 shadow shadow-black text-white rounded-sm cursor-pointer hover:bg-zinc-800 hover:ring-zinc-700 transition-colors duration-300"
                disabled={pending}
                type="submit"
            >
                {pending ? "Inscription en cours..." : "Valider"}
            </button>
        </form>
    )
}