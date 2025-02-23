import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog"
import { EventT } from "@/data/get-events"
import { EventCard } from "@/feats/event-card/event-card"
import { Ticket } from "lucide-react"

type EventDialogProps = {
    event: EventT
    sessionId: string
}

export const EventDialog: React.FC<EventDialogProps> = ({ event, sessionId}) => {
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
                <EventCard readOnly event={event} sessionId={sessionId}/>
            </DialogContent>
        </Dialog>
    )
}