'use client'

import { cn } from "@/lib/cn"
import { useState } from "react"

export const ContactCard = ({ contact, setMembers }) => {
    const {firstname, lastname, _id, avatarUrl} = contact
    const [isSelected, setIsSelected] = useState(false)

    return (
        <div
            className={cn("",
                isSelected && "border border-green-300"
            )}
            onClick={() => {
                setMembers(prev => {
                    if (prev.includes(contact._id)) return prev.filter(_id => _id !== contact._id)
                    return [...prev, contact._id]
                })
                setIsSelected(prev => !prev)
            }}
        >
            {firstname}
        </div>
    )
}