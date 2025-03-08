import { Button } from "@/components/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog"
import { Edit } from "lucide-react"
import { EditConversationNameForm } from "../conversation.forms"

type EditConversationNameDialogProps = {
    conversationId: string
}

export const EditConversationNameDialog: React.FC<EditConversationNameDialogProps> = ({ conversationId }) => {
    return (
        <Dialog>
            <Button asChild icon>
                <DialogTrigger>
                    <Edit/>
                </DialogTrigger>
            </Button>
            <DialogContent>
                <EditConversationNameForm conversationId={conversationId}/>
            </DialogContent>
        </Dialog>
    )
}