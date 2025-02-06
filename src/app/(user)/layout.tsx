import { Calendar, House, LinkIcon, LogOut, MessageSquare, Ticket } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteSession } from "@/auth/session"
import { SessionAvatar } from "@/auth/session-avatar"
import Link from "next/link"

export default function UserLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="max-md:flex-col flex w-full h-screen">
            <div className="flex md:flex-col items-center justify-between md:h-screen max-md:px-4 min-w-50 border-r border-black/20 shadow shadow-black/20">
                <div className="flex max-md:gap-2 max-md:items-center md:flex-col md:w-full">
                    <Link href="/account" className="flex shrink-0 justify-center items-center p-3 md:p-4">
                        <SessionAvatar className="h-10 w-10 md:h-15 md:w-15 rounded-full not-hover:opacity-90" height={60} width={60}/>
                    </Link>

                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/dashboard">
                        <House />
                        <p className="max-md:hidden">Dashboard</p>
                    </Link>
                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/conversations">
                        <MessageSquare />
                        <p className="max-md:hidden">Conversations</p>
                    </Link>
                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/calendar">
                        <Calendar />
                        <p className="max-md:hidden">Calendrier</p>
                    </Link>
                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/events">
                        <Ticket />
                        <p className="max-md:hidden">Evenements</p>
                    </Link>
                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/contacts">
                        <LinkIcon />
                        <p className="max-md:hidden">Links</p>
                    </Link>
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