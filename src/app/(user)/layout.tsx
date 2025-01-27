import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"
import { deleteSession } from "@/auth/session"

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex">
            <div className="flex flex-col justify-between h-screen w-50 border-r border-black/20 shadow shadow-black/20">
                <div>logo</div>
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