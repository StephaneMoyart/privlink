import { NavBar } from "./components/navbar"

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <div className="flex">
            <NavBar/>
            {children}
        </div>
    )
  }