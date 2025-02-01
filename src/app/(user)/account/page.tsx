import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import { SessionAvatar } from "@/auth/session-avatar"
import { ChangeAvatarForm } from "./account.forms"

const Page = async () => {
    const {firstname, lastname} = await getSessionOrRedirect()

    return (
        <div className="flex justify-center items-center w-full">
            <div className="p-10 rounded-md border border-black/20 shadow shadow-black/20">
                <div className="relative w-50 h-50">
                    <SessionAvatar
                        className="h-full w-full rounded-full"
                        height={200}
                        width={200}
                    />
                    <ChangeAvatarForm/>
                </div>
                <p>{firstname}</p>
                <p>{lastname}</p>
            </div>
        </div>
    )
}

export default Page