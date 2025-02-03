import { Calendar, House, LinkIcon, LogOut, MessageSquare, Ticket } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteSession } from "@/auth/session"
import { SessionAvatar } from "@/auth/session-avatar"
import Link from "next/link"

export default function UserLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col items-center justify-between h-screen min-w-50 border-r border-black/20 shadow shadow-black/20">
                <div className="flex flex-col w-full">
                    <Link href="/account" className="flex justify-center items-center p-4">
                        <SessionAvatar className="h-15 w-15 rounded-full not-hover:opacity-90" height={60} width={60}/>
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
                    className="flex items-center w-full h-12 justify-center gap-4 cursor-pointer hover:bg-orange-500" type="submit">
                    <LogOut />
                    <p className="max-md:hidden">Deconnexion</p>
                </button>
            </div>
            <div className="w-full h-full p-4 overflow-y-scroll">
                {children}
            </div>
        </div>
    )
  }