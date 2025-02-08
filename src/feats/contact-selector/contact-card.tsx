'use client'

import { UserAvatar } from "@/components/user-avatar"
import { cn } from "@/lib/cn"
import { useState } from "react"
import { Contact } from "./contact-selector"

type ContactCardProps = {
    contact: Contact
    setMembers: React.Dispatch<React.SetStateAction<string[]>>
}

export const ContactCard: React.FC<ContactCardProps> = ({ contact, setMembers }) => {
    const {firstname, lastname, _id, avatarUrl} = contact
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div
            className={cn("flex items-center gap-2 p-2 rounded-md border-2",
                isSelected && "border-green-500"
            )}
            onClick={() => {
                setMembers(prev => {
                    if (prev.includes( _id)) return prev.filter( _id => _id !== contact._id)
                    return [...prev, contact._id]
                })
                setIsSelected(prev => !prev)
            }}
        >
            <UserAvatar className="h-7.5 w-7.5" avatarUrl={avatarUrl} height={30} width={30}/>
            <p>{firstname}</p>
            <p>{lastname}</p>
        </div>
    )
}