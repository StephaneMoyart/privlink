import { ShinyButton } from "@/components/shiny-button"

export default function Home() {
    return (
        <div className="flex flex-col gap-10 items-center justify-center h-dvh bg-accent">
            <h1 className="uppercase text-7xl md:text-9xl font-bold text-black">
              PrivLink
            </h1>
            <div className="flex gap-5">
                <ShinyButton href="/signin">
                    Connexion
                </ShinyButton>
                <ShinyButton href="/signup">
                    Inscription
                </ShinyButton>
            </div>
        </div>
    )
}
