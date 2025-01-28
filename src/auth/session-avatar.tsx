import Image from "next/image"
import { getSession } from "./session"
import { User } from "lucide-react"

type SessionAvatarProps = {
    height: number
    width: number
    className?: string
}

export const SessionAvatar: React.FC<SessionAvatarProps> = async ({ height, width }) => {
    const { avatarUrl } = await getSession()

    return (
        <div className="flex justify-center items-center w-full h-full">
            {avatarUrl ?
                <Image
                    src={avatarUrl}
                    alt="avatar"
                    height={height}
                    width={width}
                    className="w-full h-full"
                />
                : <User />
            }
        </div>
    )
}