'use client'

import { useActionState } from "react"
import { acceptContactInvitationAction, declineContactInvitationAction } from "./invitations.actions"
import { Button } from "@/components/classic-button"

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
            <Button
                color="green"
                disabled={pending}
            >
                Accepter
            </Button>
        </form>
    )
}

export const DeclineContactInvitationForm: React.FC<DeclineContactInvitationFormProps> = ({ invitationId }) => {
    const [, action, pending] = useActionState(() => declineContactInvitationAction(invitationId), null)

    return (
        <form action={action}>
            <Button
                color="red"
                disabled={pending}
            >
                Refuser
            </Button>
        </form>
    )
}