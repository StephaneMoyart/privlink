import Link from "next/link"
import { SignInForm } from "./signin.forms"

const Page = () => {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className="relative flex flex-col gap-10 justify-center items-center pt-12 p-10 border border-black/20 rounded-md shadow-md shadow-black/20">
                <h2 className="absolute top-0 -translate-y-[50%] bg-white px-2 uppercase text-zinc-950 text-2xl">
                    Connexion
                </h2>
                <SignInForm/>
                <div className="flex gap-2">
                    <p className="text-zinc-500">Pas encore inscrit ?</p>
                    <Link className="relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-[0px] hover:after:w-full after:transition-width after:duration-300 after:h-[1px] after:bg-zinc-950" href="/signup">
                        Inscrivez-vous
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Page