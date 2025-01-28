import Image from "next/image"
import { User } from "lucide-react"

type UserAvatarProps = {
    avatarUrl: string
    height: number
    width: number
}

export const UserAvatar: React.FC<UserAvatarProps> = ({ avatarUrl, height, width }) => {

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