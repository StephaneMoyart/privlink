import { deleteSession } from "@/auth/session"
import { LogOut } from "lucide-react"
import { redirect } from "next/navigation"

export function SignOut() {
    return (
        <form
            action={async () => {
                "use server"
                await deleteSession()
                redirect('/signin')
            }}
        >
            <button className="flex items-center h-10 p-2 rounded-sm hover:bg-white" type="submit">
                <LogOut />
                <p className="max-md:hidden">Deconnexion</p>
            </button>
        </form>
    )
}