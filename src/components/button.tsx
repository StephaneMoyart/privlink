import { cn } from "@/lib/cn"
import { Loader } from "./loader"
import { Slot } from "@radix-ui/react-slot"

const colorVariants: Record<string, string> = {
    stone: "bg-linear-to-b from-stone-800 to-stone-950 shadow shadow-stone-950 border-stone-950 hover:from-stone-700 hover:to-stone-800 hover:shadow-stone-800 hover:border-stone-800",
    blue: "bg-linear-to-b from-blue-600 to-blue-700 shadow shadow-blue-800 border-blue-700 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-900 hover:border-blue-800",
    red: "bg-linear-to-b from-red-600 to-red-700 shadow shadow-red-800 border-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-red-900 hover:border-red-800",
    green: "bg-linear-to-b from-green-600 to-green-700 shadow shadow-green-800 border-green-700 hover:from-green-700 hover:to-green-800 hover:shadow-green-900 hover:border-green-800",
    yellow: "bg-linear-to-b from-yellow-600 to-yellow-700 shadow shadow-yellow-800 border-yellow-700 hover:from-yellow-700 hover:to-yellow-800 hover:shadow-yellow-900 hover:border-yellow-800",
    purple: "bg-linear-to-b from-purple-600 to-purple-700 shadow shadow-purple-800 border-purple-700 hover:from-purple-700 hover:to-purple-800 hover:shadow-purple-900 hover:border-purple-800",
    orange: "bg-linear-to-b from-orange-600 to-orange-700 shadow shadow-orange-800 border-orange-700 hover:from-orange-700 hover:to-orange-800 hover:shadow-orange-900 hover:border-orange-800",
    pink: "bg-linear-to-b from-pink-600 to-pink-700 shadow shadow-pink-800 border-pink-700 hover:from-pink-700 hover:to-pink-800 hover:shadow-pink-900 hover:border-pink-800",
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
    color = "stone",
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