'use client'

import { useRef } from "react"
import { changeAvatarAction } from "./account.actions"

export const ChangeAvatarForm = () => {
    // const [state, action, pending] = useActionState(changeAvatarAction, null)

    const selectForm = useRef<HTMLFormElement>(null)

    const handleSubmit = async () => {
        let formData= null
        if (selectForm.current) formData = new FormData(selectForm.current)
        await changeAvatarAction(null, formData as FormData)
    }

    return (
        <form ref={selectForm} className="flex items-center justify-center absolute top-0 left-0 h-full w-full">
            <label className="opacity-0 flex items-center justify-center w-full h-full bg-transparent rounded-full text-xl font-bold transition:all duration-500 hover:opacity-100 hover:bg-black/20 hover:cursor-pointer" htmlFor="userAvatar">Modifier</label>
            <input onChange={handleSubmit} type="file" className="hidden" name="userAvatar" id="userAvatar"/>
        </form>
    )
}