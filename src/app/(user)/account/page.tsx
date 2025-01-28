import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { SessionAvatar } from "@/auth/session-avatar"
import { ChangeAvatarForm } from "./account.forms"

const Page = async () => {
    const {firstname, lastname} = await getSessionOrRedirect()

    return (
        <div className="h-full w-full bg-green-200 flex flex-col">
            <div className="relative top-0 left-0 w-45 h-45">
                <SessionAvatar height={180} width={180}/>
                <ChangeAvatarForm/>
            </div>
            <p>{firstname}</p>
            <p>{lastname}</p>
        </div>
    )
}

export default Page