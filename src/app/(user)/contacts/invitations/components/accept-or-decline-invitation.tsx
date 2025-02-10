'use client'

import { useTransition } from "react"
import { Button } from "@/components/button"
import { acceptContactInvitationAction, declineContactInvitationAction } from "../invitations.actions"

type AcceptOrDeclineInvitationProps = {
    invitedByUserId: string
    invitationId: string
}

export const AcceptOrDeclineInvitation: React.FC<AcceptOrDeclineInvitationProps> = ({ invitedByUserId , invitationId }) => {
    const [acceptPending, acceptTransition] = useTransition()
    const [declinePending, declineTransition] = useTransition()

    return (
        <div className="flex items-center gap-2">
            <Button
                color="green"
                onClick={() => acceptTransition(() => acceptContactInvitationAction(invitedByUserId, invitationId))}
                disabled={acceptPending}
                pending={acceptPending}
            >
                Accepter
            </Button>

            <Button
                color="red"
                onClick={() => declineTransition(() => declineContactInvitationAction(invitationId))}
                disabled={declinePending}
                pending={declinePending}
            >
                Refuser
            </Button>
        </div>
    )
}