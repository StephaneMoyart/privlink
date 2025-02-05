import { cn } from "@/lib/cn"
import { Loader } from "./loader"
import { Slot } from "@radix-ui/react-slot"

const colorVariants: Record<string, string> = {
    dark: "bg-zinc-950 hover:bg-zinc-800 border-zinc-800 hover:border-zinc-700",
    zinc: "bg-zinc-500 hover:bg-zinc-600 border-zinc-400 hover:border-zinc-500",
    blue: "bg-blue-500 hover:bg-blue-600 border-blue-400 hover:border-blue-500",
    red: "bg-red-500 hover:bg-red-600 border-red-400 hover:border-red-500",
    green: "bg-green-500 hover:bg-green-600 border-green-400 hover:border-green-500",
    yellow: "bg-yellow-500 hover:bg-yellow-600 border-yellow-400 hover:border-yellow-500",
    purple: "bg-purple-500 hover:bg-purple-600 border-purple-400 hover:border-purple-500",
    orange: "bg-orange-500 hover:bg-orange-600 border-orange-400 hover:border-orange-500",
    pink: "bg-pink-500 hover:bg-pink-600 border-pink-400 hover:border-pink-500"
}

type BaseButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    color?: keyof typeof colorVariants
    icon?: boolean
}

type ButtonWithPending = BaseButtonProps & { pending: true; asChild?: false }
type ButtonWithAsChild = BaseButtonProps & { asChild: true; pending?: never }
type ButtonWithNone = BaseButtonProps & { asChild?: false; pending?: false }

type ButtonProps = ButtonWithPending | ButtonWithAsChild | ButtonWithNone;

export const Button: React.FC<ButtonProps> = ({
    color = "dark",
    icon = false,
    pending = false,
    asChild = false,
    className,
    children,
    ...props
}) => {
    const Comp = asChild ? Slot : "button"

    return (
        <Comp
            className={cn(
                "flex items-center justify-center px-4 py-2 text-white cursor-pointer shadow rounded-md border-2 transition duration-300",
                colorVariants[color],
                icon && "px-2 aspect-square",
                className
            )}
            {...props}
        >
            {pending
                ?
                <span className="relative flex justify-center items-center w-full h-full">
                    <span className={cn("flex justify-center items-center invisible"
                    )}>
                        {children}
                    </span>
                    <Loader className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"/>
                </span>
                :
                children
            }
        </Comp>
    )
}