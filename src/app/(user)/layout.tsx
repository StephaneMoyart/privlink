import { House, LinkIcon, LogOut, MessageSquare, Ticket } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteSession } from "@/auth/session"
import { SessionAvatar } from "@/auth/session-avatar"
import Link from "next/link"

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col items-center justify-between h-screen min-w-50 border-r border-black/20 shadow shadow-black/20">
                <div className="flex flex-col w-full">
                    <Link className="flex self-center h-[60px] w-[60px] my-4 rounded-full overflow-hidden opacity-100 hover:opacity-90" href="/account">
                        <SessionAvatar height={60} width={60}/>
                    </Link>

                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/dashboard">
                        <House />
                        <p className="max-md:hidden">Dashboard</p>
                    </Link>
                    <Link className="flex w-full items-center pl-4 gap-4 h-12 hover:bg-black/20" href="/conversations">
                        <MessageSquare />
                        <p className="max-md:hidden">Conversations</p>
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
                    className="flex items-center w-full h-12 justify-center gap-4 cursor-pointer hover:bg-orange-300" type="submit">
                    <LogOut />
                    <p className="max-md:hidden">Deconnexion</p>
                </button>
            </div>
            <div className=" w-full h-full bg-yellow-100 p-2">
                {children}
            </div>
        </div>
    )
  }