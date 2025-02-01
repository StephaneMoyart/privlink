// NO client
// This component must take the same className width and height that what is given to the Image

import Image from "next/image"
import { getSession } from "./session"
import { User } from "lucide-react"

type SessionAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    height: number
    width: number
}

export const SessionAvatar: React.FC<SessionAvatarProps> = async ({ height, width, className }) => {
    const { avatarUrl } = await getSession()

    return (
        <>
            {avatarUrl ?
                <Image
                    src={avatarUrl}
                    alt="avatar"
                    height={height}
                    width={width}
                    className={className}
                />
                : <User className={className}/>
            }
        </>
    )
}