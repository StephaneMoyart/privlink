import { getSession } from "@/auth/session"

const Page = async () => {
    const session = await getSession()
    console.log(session);


    return (
        <>
            <div className="flex w-full h-full px-2">ceci est un dashboard, bienvenue.</div>
        </>
    )
}

export default Page