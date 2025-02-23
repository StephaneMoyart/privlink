import { Button } from "@/components/button"
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/dialog"
import { UserAvatar } from "@/components/user-avatar"
import { UserBaseWithBirthday } from "@/data/get-contacts-birthdays"
import { Cake } from "lucide-react"
import Link from "next/link"

type BirthdayDialogProps = {
    currentYear: number
    contact: UserBaseWithBirthday
}

export const BirthdayDialog: React.FC<BirthdayDialogProps> = ({ contact, currentYear }) => {
    const {firstname, lastname, avatar, birthdate} = contact
    const age = currentYear - new Date(birthdate).getFullYear()

    return (
        <Dialog>
            <DialogTrigger className="flex items-center gap-2 bg-yellow-300 px-1 rounded cursor-pointer w-full truncate">
                <Cake size={20}/>
                {firstname} {lastname}
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="flex items-center gap-2">
                    <p>Anniversaire de {firstname} {lastname}</p>
                    <UserAvatar
                        className="h-10 w-10 rounded-full"
                        avatar={avatar}
                        height={40}
                        width={40}
                    />
                </DialogTitle>
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Cake/>
                        <p>{firstname} fêtera ses {age} ans</p>
                    </div>

                    <Button asChild>
                        <Link href={'/conversations'}>
                            Envoyer un message
                        </Link>
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}