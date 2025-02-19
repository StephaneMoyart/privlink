// call this component to call the feature.
// Needs a contact[] with (id, firstname, lastname, avatarUrl) AND a setter
// render a selectable list of contacts to set a string[] of ids

'use client'

import React from "react"
import { ContactCard } from "./contact-card"
import { Contact } from "@/data/get-contacts"

type ContactSelectorProps = {
    contacts: Contact[]
    setMembers: React.Dispatch<React.SetStateAction<string[]>>
}

export const ContactSelector: React.FC<ContactSelectorProps> = ({ contacts, setMembers }) => {
    return (
        <div className="space-y-2">
            {contacts.map(contact => (
                <ContactCard
                    setMembers={setMembers}
                    key={contact.id}
                    contact={contact}
                />
            ))}
        </div>
    )
}