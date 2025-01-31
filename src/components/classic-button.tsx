import { cn } from "@/lib/cn"

const colorVariants: Record<string, string> = {
    zinc: "bg-zinc-500 hover:bg-zinc-600 ring-zinc-400 hover:ring-zinc-500",
    blue: "bg-blue-500 hover:bg-blue-600 ring-blue-400 hover:ring-blue-500",
    red: "bg-red-500 hover:bg-red-600 ring-red-400 hover:ring-red-500",
    green: "bg-green-500 hover:bg-green-600 ring-green-400 hover:ring-green-500",
    yellow: "bg-yellow-500 hover:bg-yellow-600 ring-yellow-400 hover:ring-yellow-500",
    purple: "bg-purple-500 hover:bg-purple-600 ring-purple-400 hover:ring-purple-500",
    orange: "bg-orange-500 hover:bg-orange-600 ring-orange-400 hover:ring-orange-500",
    pink: "bg-pink-500 hover:bg-pink-600 ring-pink-400 hover:ring-pink-500",
};

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: keyof typeof colorVariants,
    icon?: boolean
}

export const Button: React.FC<ButtonProps> = ({ color = "zinc", icon = false, className, children, ...props }) => {
    return (
        <button
            className={cn(
                "px-4 py-2 text-white cursor-pointer shadow rounded ring-2 transition duration-300",
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