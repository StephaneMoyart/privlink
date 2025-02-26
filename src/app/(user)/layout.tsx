import { Calendar, House, LinkIcon, LogOut, LucideProps, MessageSquare, Ticket } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteSession } from "@/auth/session"
import { SessionAvatar } from "@/auth/session-avatar"
import Link from "next/link"
import { ForwardRefExoticComponent, RefAttributes } from "react"

type ItemProps = {
    icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>
    text: string
    href: string
}

const Item: React.FC<ItemProps> = ({icon: Icon, text, href}) => {
    return (
        <Link className="flex w-full items-center pl-4 gap-4 h-12 md:hover:bg-black/20" href={href}>
            <Icon/>
            <p className="max-md:hidden">{text}</p>
        </Link>
    )
}

export default function UserLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="max-md:flex-col flex w-full h-screen">
            <div className="flex md:flex-col items-center justify-between md:h-screen max-md:pl-2 max-md:pr-4 min-w-50 border-r border-black/20 shadow shadow-black/20">
                <div className="flex max-md:gap-2 max-md:items-center md:flex-col md:w-full">
                    <Link href="/account" className="flex shrink-0 justify-center items-center p-3 md:p-4">
                        <SessionAvatar className="h-10 w-10 md:h-15 md:w-15 rounded-full not-hover:opacity-90" height={60} width={60}/>
                    </Link>

                    <Item icon={House} text={"Dashboard"} href="/dashboard"/>
                    <Item icon={MessageSquare} text={"Conversations"} href="/conversations"/>
                    <Item icon={Calendar} text={"Calendrier"} href="/calendar"/>
                    <Item icon={Ticket} text={"Evenements"} href="events"/>
                    <Item icon={LinkIcon} text={"Links"} href="contacts"/>
                </div>

                <button
                    onClick={async () => {
                        "use server"
                        await deleteSession()
                        redirect('/signin')
                    }}
                    className="md:flex md:items-center md:w-full md:h-12 justify-center gap-4 cursor-pointer hover:bg-orange-300 hover:text-orange-900">
                    <LogOut />
                    <p className="max-md:hidden">Deconnexion</p>
                </button>
            </div>
            <div className="w-full h-full p-4 overflow-y-auto">
                {children}
            </div>
        </div>
    )
  }