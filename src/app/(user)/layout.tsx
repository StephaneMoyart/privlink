import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteSession } from "@/auth/session"
import { SessionAvatar } from "@/auth/session-avatar"
import Link from "next/link"

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex w-full h-screen">
            <div className="flex flex-col items-center justify-between h-screen min-w-50 border-r border-black/20 shadow shadow-black/20">
                <Link className="h-[50px] w-[50px] pb-2 opacity-100 hover:opacity-90" href="/account">
                    <SessionAvatar height={50} width={50}/>
                </Link>
                <button
                    onClick={async () => {
                        "use server"
                        await deleteSession()
                        redirect('/signin')
                    }}
                    className="flex items-center h-10 p-2 rounded-sm hover:bg-white" type="submit">
                    <LogOut />
                    <p className="max-md:hidden">Deconnexion</p>
                </button>
            </div>
            {children}
        </div>
    )
  }