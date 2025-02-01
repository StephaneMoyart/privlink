// This component must take the same className width and height that what is given to the Image

import Image from "next/image"
import { User } from "lucide-react"

type UserAvatarProps = React.HTMLAttributes<HTMLDivElement> & {
    avatarUrl: string
    height: number
    width: number
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, height, width, className }) => {
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