'use client'

import { useActionState } from "react"
import { acceptContactInvitationAction, declineContactInvitationAction } from "./invitations.actions"

type AcceptContactInvitationFormProps = {
    invitedByUserId: string
    invitationId: string
}

type DeclineContactInvitationFormProps = {
    invitationId: string
}

export const AcceptContactInvitationForm: React.FC<AcceptContactInvitationFormProps> = ({ invitedByUserId , invitationId }) => {
    const [, action, pending] = useActionState(() => acceptContactInvitationAction(invitedByUserId, invitationId), null)

    return (
        <form action={action}>
            <button
                className="py-3 px-6 cursor-pointer shadow bg-green-500 rounded-md border border-green-400 hover:border-green-500 hover:bg-green-600"
                type="submit"
                disabled={pending}
            >
                Accepter
            </button>
        </form>
    )
}

export const DeclineContactInvitationForm: React.FC<DeclineContactInvitationFormProps> = ({ invitationId }) => {
    const [, action, pending] = useActionState(() => declineContactInvitationAction(invitationId), null)

    return (
        <form action={action}>
            <button
                className="py-3 px-6 cursor-pointer shadow bg-red-500 rounded-md border border-red-400 hover:border-red-500 hover:bg-red-600"
                type="submit"
                disabled={pending}
            >
                Refuser
            </button>
        </form>
    )
}