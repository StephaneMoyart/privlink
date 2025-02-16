'use client'

import { useActionState, useEffect, useState } from "react"
import { useDebounceValue } from "@/hooks/use-debounce-value"
import { getUserByQueryAction, sendContactInvitationAction } from "./contact.actions"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/button"

export const SearchUserForm = () => {
    const [query, setQuery] = useState<string>('')
    const [queryResult, setQueryResult] = useState<Contact[]>([])
    const [isSearchVisible, setIsSearchVisible] = useState<boolean>(true)
    const [invitedUserId, setInvitedUserId] = useState<string>('')
    const debouncedValue = useDebounceValue(query, 500)
    console.log(queryResult);

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

        getUserByQueryAction(debouncedValue).then(setQueryResult)
    }, [debouncedValue, setQueryResult])

    const [, action, pending] = useActionState(() => sendContactInvitationAction(invitedUserId), null)

    return (
        <form className="max-md:w-full flex gap-1" action={action}>
            <div className="max-md:w-full border shadow focus-within:border-zinc-950 transition-all duration-300">
                {isSearchVisible &&
                    <input
                        className="max-md:w-full w-[350px] h-12 p-4 outline-none"
                        placeholder="ajouter un membre"
                        onChange={e => setQuery(e.target.value)}
                        value={query}
                    />
                }
                {queryResult.map(({ id, firstname, lastname, avatar}) => (
                    <div className="flex w-[350px] gap-2 items-center h-12 p-4" key={id}
                        onClick={() => {
                            setIsSearchVisible(false)
                            setInvitedUserId(id)
                        }}
                    >
                        <UserAvatar
                            className="h-8 w-8 rounded-full overflow-hidden"
                            avatarUrl={avatar}
                            height={32}
                            width={32}
                        />
                        <p>
                            {firstname} {lastname}
                        </p>
                    </div>
                ))}
            </div>
            {invitedUserId &&
                <>
                    <Button
                        color="orange"
                        onClick={() => handleGlobalResearchReset()}
                        type="button"
                    >
                        Annuler
                    </Button>
                    <Button
                        color="green"
                        disabled={pending}
                        pending={pending}
                    >
                        Ajouter
                    </Button>
                </>
            }
        </form>
    )
}