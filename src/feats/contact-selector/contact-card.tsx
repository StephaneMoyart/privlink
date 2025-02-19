'use client'

import { UserAvatar } from "@/components/user-avatar"
import { UserBase } from "@/data/get-events"
import { cn } from "@/lib/cn"
import { useState } from "react"

type ContactCardProps = {
    contact: UserBase
    setMembers: React.Dispatch<React.SetStateAction<string[]>>
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, setMembers }) => {
    const {firstname, lastname, id, avatar} = contact
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div
            className={cn("flex items-center gap-2 p-2 rounded-md border-2",
                isSelected && "border-green-500"
            )}
            onClick={() => {
                setMembers(prev => {
                    if (prev.includes(id)) return prev.filter( id => id !== contact.id)
                    return [...prev, contact.id]
                })
                setIsSelected(prev => !prev)
            }}
        >
            <UserAvatar className="h-7.5 w-7.5" avatar={avatar} height={30} width={30}/>
            <p>{firstname}</p>
            <p>{lastname}</p>
        </div>
    )
}