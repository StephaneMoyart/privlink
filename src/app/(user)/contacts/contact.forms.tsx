'use client'

import { useActionState, useEffect, useState } from "react"
import { useDebounceValue } from "@/hooks/use-debounce-value"
import { getUserByQueryAction, sendContactInvitationAction } from "./contact.actions"
import { UserAvatar } from "@/components/user-avatar"
import { Button } from "@/components/button"
import { UserBase } from "@/data/get-events"

type SearchUserFormProps = {
    contacts: UserBase[]
}

export const SearchUserForm: React.FC<SearchUserFormProps> = ({ contacts }) => {
    const [query, setQuery] = useState<string>('')
    const [queryResult, setQueryResult] = useState<UserBase[]>([])
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

        getUserByQueryAction(debouncedValue, contacts).then(setQueryResult)
    }, [debouncedValue, setQueryResult, contacts])

    const [, action, pending] = useActionState(() => sendContactInvitationAction(invitedUserId), null)

    return (
        <form className="max-md:w-full flex gap-1" action={action}>
                {isSearchVisible &&
                    <div className="relative flex flex-col gap-2">
                        <input
                            className="max-md:w-full w-[350px] h-12 p-4 outline-none shadow-lg rounded-lg focus:ring focus:ring-zinc-950 transition-all duration-300"
                            placeholder="ajouter un membre"
                            onChange={e => setQuery(e.target.value)}
                            value={query}
                        />
                        { queryResult.length > 0 &&
                            <div className="absolute top-13 flex flex-col gap-1 shadow-lg border bg-white border-zinc-950 rounded-lg overflow-hidden">
                                {queryResult.map(({ id, firstname, lastname, avatar}) => (
                                    <div className="flex w-[350px] gap-2 items-center h-12 p-4 cursor-pointer hover:bg-gray-100" key={id}
                                        onClick={() => {
                                            setIsSearchVisible(false)
                                            setInvitedUserId(id)
                                        }}
                                    >
                                        <UserAvatar
                                            className="h-8 w-8 rounded-full overflow-hidden"
                                            avatar={avatar}
                                            height={32}
                                            width={32}
                                        />
                                        <p>
                                            {firstname} {lastname}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        }
                    </div>
                }
            {invitedUserId &&
                <>
                    {queryResult.filter(result => result.id === invitedUserId).map(user => (
                        <div className="flex w-[350px] gap-2 items-center h-12 p-4" key={user.id}>
                            <UserAvatar
                                className="h-8 w-8 rounded-full overflow-hidden"
                                avatar={user.avatar}
                                height={32}
                                width={32}
                            />
                            <p>
                                {user.firstname} {user.lastname}
                            </p>
                        </div>
                    ))}
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