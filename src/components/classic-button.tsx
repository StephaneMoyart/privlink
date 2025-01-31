import { cn } from "@/lib/cn"

const colorVariants: Record<string, string> = {
    dark: "bg-zinc-950 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700",
    zinc: "bg-zinc-500 hover:bg-zinc-600 border-zinc-400 hover:border-zinc-500",
    blue: "bg-blue-500 hover:bg-blue-600 border-blue-400 hover:border-blue-500",
    red: "bg-red-500 hover:bg-red-600 border-red-400 hover:border-red-500",
    green: "bg-green-500 hover:bg-green-600 border-green-400 hover:border-green-500",
    yellow: "bg-yellow-500 hover:bg-yellow-600 border-yellow-400 hover:border-yellow-500",
    purple: "bg-purple-500 hover:bg-purple-600 border-purple-400 hover:border-purple-500",
    orange: "bg-orange-500 hover:bg-orange-600 border-orange-400 hover:border-orange-500",
    pink: "bg-pink-500 hover:bg-pink-600 border-pink-400 hover:border-pink-500",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: keyof typeof colorVariants,
    icon?: boolean
}

export const Button: React.FC<ButtonProps> = ({ color = "dark", icon = false, className, children, ...props }) => {
    return (
        <button
            className={cn(
                "flex items-center justify-center px-4 py-2 text-white cursor-pointer shadow rounded-md border-2 transition duration-300",
                colorVariants[color] || colorVariants["zinc"],
                {"px-2": icon},
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}