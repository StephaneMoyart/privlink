'use client'

import { Ellipsis, LogOut, Trash } from "lucide-react"
import { useTransition } from "react"
import { Button } from "@/components/button"
import { deleteEventAction, quitEventAction } from "@/app/(user)/events/events.actions"
import { Dropdown, DropdownContent, DropdownTrigger } from "@/components/dropdown"

type EventCardSettingsProps = {
    eventId: string
    isCreator: boolean
}

export const EventCardSettings: React.FC<EventCardSettingsProps> = ({ eventId, isCreator }) => {
    const [pending, setEventDeleteTransition] = useTransition()
    const [quitPending, setEventQuittingTransition] = useTransition()

    return (
        <div className="px-2">
            <Dropdown>
                <DropdownTrigger>
                    <Ellipsis size={35} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                </DropdownTrigger>

                <DropdownContent>
                    {isCreator
                        ?
                        <Button
                            color="red"
                            disabled={pending}
                            pending={pending}
                            icon
                            onClick={() => setEventDeleteTransition(() => deleteEventAction(eventId))}
                        >
                            <Trash/>
                        </Button>
                        :
                        <Button
                            color="red"
                            disabled={quitPending}
                            pending={quitPending}
                            icon
                            onClick={() => setEventQuittingTransition(() => quitEventAction(eventId))}
                        >
                            <LogOut/>
                        </Button>
                    }
                </DropdownContent>
            </Dropdown>
        </div>
    )
}