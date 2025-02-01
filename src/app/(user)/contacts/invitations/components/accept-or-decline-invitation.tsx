'use client'

import { useTransition } from "react"
import { Button } from "@/components/classic-button"
import { acceptContactInvitationAction, declineContactInvitationAction } from "../invitations.actions"

type AcceptOrDeclineInvitationProps = {
    invitedByUserId: string
    invitationId: string
}

export const AcceptOrDeclineInvitation: React.FC<AcceptOrDeclineInvitationProps> = ({ invitedByUserId , invitationId }) => {
    const [acceptPending, acceptTransition] = useTransition()
    const [declinePending, declineTransition] = useTransition()

    return (
        <div className="flex items-center gap-2 bg-green-200">
            <Button
                color="green"
                onClick={() => acceptTransition(() => acceptContactInvitationAction(invitedByUserId, invitationId))}
                disabled={acceptPending}
            >
                Accepter
            </Button>

            <Button
                color="red"
                onClick={() => declineTransition(() => declineContactInvitationAction(invitationId))}
                disabled={declinePending}
            >
                Refuser
            </Button>
        </div>
    )
}