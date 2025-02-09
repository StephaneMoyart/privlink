import Link from "next/link"

type InvitationCountDisplayerProps = {
    count: number
    href: string
}

export const InvitationCountDisplayer: React.FC<InvitationCountDisplayerProps> = ({ count, href }) => {
    return (
        <>
            {count > 0
                ?
                <Link href={href}>
                    <p className="flex justify-center items-center gap-2">
                        {<span className="flex justify-center items-center w-7 h-7 rounded-full bg-black text-white">{count}</span>}{`Invitation${count === 1 ? "" :"s"}`}
                    </p>
                </Link>
                :
                <p className="text-black/50 italic">Aucune invitation reçue</p>
            }
        </>
    )
}