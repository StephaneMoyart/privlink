'use client'

import { InputWLabel } from "@/components/input"
import { useActionState } from "react"
import { signInAction } from "./signin.actions"

export const SignInForm = () => {
    const [state, action, pending] = useActionState(signInAction, null)

    return (
        <form action={action} className="flex flex-col gap-4 w-full">
            <InputWLabel name="email" label="EMAIL" type="email" state={state}/>
            <InputWLabel name="password" label="MOT DE PASSE" type="password" state={state}/>
            {state?.message && <p>{state.message}</p>}
            <button
                className="h-12 px-4 bg-zinc-950 ring-2 ring-zinc-800 shadow shadow-black text-white rounded-sm cursor-pointer hover:bg-zinc-800 hover:ring-zinc-700 transition-colors duration-300"
                disabled={pending}
                type="submit"
            >
                {pending ? "Connexion en cours..." : "Connexion"}
            </button>
        </form>
    )
}