'use client'

import { useActionState, useEffect, useState } from "react"
import { useDebounceValue } from "@/hooks/use-debounce-value"
import { getUserByQueryAction, sendContactInvitationAction } from "./contact.actions"
import { UserAvatar } from "@/components/user-avatar"

type UserTypes = {
    _id: string
    firstname: string
    lastname: string
    avatarUrl: string
}

export const SearchUserForm = () => {
    const [query, setQuery] = useState<string>('')
    const [queryResult, setQueryResult] = useState<UserTypes[]>([])
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(true)
    const [invitedUserId, setInvitedUserId] = useState<string>('')
    const debouncedValue = useDebounceValue(query, 500)

    const handleGlobalResearchReset = () => {
        setQuery('')
        setQueryResult([])
        setInvitedUserId('')
        setIsSearchVisible(true)
    }

    useEffect(() => {
        if (!debouncedValue) {
            setQueryResult([])
            return
        }

        (async () => {
            const result = await getUserByQueryAction(debouncedValue)
            setQueryResult(result)
        }) ()
    }, [debouncedValue, setQueryResult])

    const [, action, pending] = useActionState(() => sendContactInvitationAction(invitedUserId), null)

    return (
        <form className="flex gap-1" action={action}>
            <div className="border shadow focus-within:border-zinc-950 transition-all duration-300">
                {isSearchVisible &&
                    <input
                        className="w-[350px] h-12 p-4 outline-none"
                        placeholder="ajouter un membre"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                }
                {queryResult.map(({_id, firstname, lastname, avatarUrl}) => (
                    <div className="flex w-[350px] gap-2 items-center h-12 p-4" key={_id}
                        onClick={() => {
                            setIsSearchVisible(false)
                            setInvitedUserId(_id)
                        }}
                    >
                        <div className="h-8 w-8 rounded-full overflow-hidden">
                            <UserAvatar avatarUrl={avatarUrl} height={32} width={32}/>
                        </div>
                        <p>
                            {firstname} {lastname}
                        </p>
                    </div>
                ))}
            </div>
            {invitedUserId &&
                <>
                    <button
                        className="bg-orange-500 hover:bg-orange-600"
                        onClick={() => handleGlobalResearchReset()}
                        type="button"
                    >
                        Annuler
                    </button>
                    <button className="bg-green-500 hover:bg-green-600" type="submit" disabled={pending}>
                        Ajouter
                    </button>
                </>
            }
        </form>
    )
}