import { redirect } from "next/navigation"
import { getSession } from "./session"

export const getSessionOrRedirect = async () => {
    const session = await getSession()
    if (!session) return redirect('/signin')
    return session
}