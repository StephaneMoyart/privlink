import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog"
import { EventT } from "@/data/get-events"
import { EventCard } from "@/feats/event-card/event-card"
import { Ticket } from "lucide-react"
import { useCalendarContext } from "../context/calendar-context"

type EventDialogProps = {
    event: EventT
}

export const EventDialog: React.FC<EventDialogProps> = ({ event }) => {
    const { id } = useCalendarContext()

    return (
        <Dialog>
            <DialogTrigger className="flex gap-2 items-center bg-blue-300 px-1 rounded cursor-pointer w-full truncate">
                <Ticket size={20}/>
                {event.title}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>
                    Details de l&apos;évenement
                </DialogTitle>
                <EventCard readOnly event={event} sessionId={id}/>
            </DialogContent>
        </Dialog>
    )
}