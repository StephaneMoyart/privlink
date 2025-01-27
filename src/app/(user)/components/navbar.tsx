import { SignOut } from "./signout-button"

export const NavBar = () => {
    return (
        <div className="flex flex-col justify-between h-screen w-50 border-r border-black/20 shadow shadow-black/20">
            <div>logo</div>
            <SignOut/>
        </div>
    )
}