'use client'

import { useActionState, useEffect, useState } from "react"
import { useDebounceValue } from "@/hooks/use-debounce-value"
import { getUserByQueryAction, sendContactInvitationAction } from "./contact.actions"

type UserTypes = {
    _id: string
    firstname: string
    lastname: string
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
        if (!debouncedValue) return

        (async () => {
            const result = await getUserByQueryAction(debouncedValue)
            setQueryResult(result)
        }) ()
    }, [debouncedValue, setQueryResult])

    const [, action, pending] = useActionState(() => sendContactInvitationAction(invitedUserId), null)

    return (
        <form className="flex gap-1" action={action}>
            <div>
                {isSearchVisible &&
                    <input
                        placeholder="ajouter un membre"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                }
                {queryResult.map(user => (
                    <div key={user._id}
                        onClick={() => {
                            setIsSearchVisible(false)
                            setInvitedUserId(user._id)
                        }}
                    >
                        {user.firstname} {user.lastname}
                    </div>
                ))}
            </div>
            {invitedUserId &&
                <button
                    className="bg-orange-500 hover:bg-orange-600"
                    onClick={() => handleGlobalResearchReset()}
                    type="button"
                >
                    Annuler
                </button>
            }
            {!isSearchVisible &&
                <button className="bg-green-500 hover:bg-green-600" type="submit" disabled={pending}>
                    Ajouter
                </button>
            }
        </form>
    )
}