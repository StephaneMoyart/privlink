'use client'

import { Button } from "@/components/button"
import { useTransition } from "react"
import { acceptEventInvitationAction, declineEventInvitationAction } from "../invitations.actions"

type AcceptOrDeclineEventInvitationProps = {
    invitationId: string
    eventId: string
}

export const AcceptOrDeclineEventInvitation: React.FC<AcceptOrDeclineEventInvitationProps> = ({ invitationId, eventId }) => {
    const [acceptPending, acceptTransition] = useTransition()
    const [declinePending, declineTransition] = useTransition()

    return (
        <div className="flex items-center gap-2">
            <Button
                color="green"
                onClick={() => acceptTransition(() => acceptEventInvitationAction(invitationId, eventId))}
                disabled={acceptPending}
            >
                Accepter
            </Button>

            <Button
                color="red"
                onClick={() => declineTransition(() => declineEventInvitationAction(invitationId))}
                disabled={declinePending}
            >
                Refuser
            </Button>
        </div>
    )
}