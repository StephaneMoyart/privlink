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
            <label className="flex items-center justify-center w-full h-full bg-transparent" htmlFor="userAvatar">Modifier</label>
            <input onChange={handleSubmit} type="file" className="hidden" name="userAvatar" id="userAvatar"/>
        </form>
    )
}