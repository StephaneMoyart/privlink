import { Button } from "@/components/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog"
import { Edit } from "lucide-react"
import { EditConversationNameForm } from "../conversation.forms"
import { SelectedConversation } from "../conversation.data"

type EditConversationNameDialogProps = {
    conversationId: SelectedConversation['id']
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
                <EditConversationNameForm conversationId={conversationId} />
            </DialogContent>
        </Dialog>
    )
}