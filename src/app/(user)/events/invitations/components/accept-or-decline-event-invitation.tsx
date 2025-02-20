'use client'

import { Button } from "@/components/button"
import { useTransition } from "react"
import { acceptEventInvitationAction, declineEventInvitationAction } from "../invitations.actions"

type AcceptOrDeclineEventInvitationProps = {
    eventId: string
}

export const AcceptOrDeclineEventInvitation: React.FC<AcceptOrDeclineEventInvitationProps> = ({ eventId }) => {
    const [acceptPending, acceptTransition] = useTransition()
    const [declinePending, declineTransition] = useTransition()

    return (
        <div className="flex items-center gap-2">
            <Button
                color="green"
                onClick={() => acceptTransition(() => acceptEventInvitationAction(eventId))}
                disabled={acceptPending}
                pending={acceptPending}
            >
                Accepter
            </Button>

            <Button
                color="red"
                onClick={() => declineTransition(() => declineEventInvitationAction(eventId))}
                disabled={declinePending}
                pending={declinePending}
            >
                Refuser
            </Button>
        </div>
    )
}