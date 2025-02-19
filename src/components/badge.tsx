import { cn } from "@/lib/cn"

type BadgeProps = React.HTMLAttributes<HTMLDivElement> & {
    color?: string
    size?: string
}

const colorVariants: Record<string, string> = {
    dark: "bg-zinc-950",
    zinc: "bg-zinc-700",
    blue: "bg-blue-700",
    red: "bg-red-700",
    green: "bg-green-700",
    yellow: "bg-yellow-700",
    purple: "bg-purple-700",
    orange: "bg-orange-700",
    pink: "bg-pink-700"
}

const sizeVariants: Record<string, string> = {
    xsmall: "text-xs py-0.5 px-1.5",
    small: "text-sm py-1 px-2",
    medium: "",
    large: "text-lg py-2 px-4"
}

export const Badge: React.FC<BadgeProps> = ({ className, color = "dark", size = "medium", ...props }) => {
    return (
        <div
            className={cn(
                "text-white rounded-full py-1 px-2",
                colorVariants[color],
                sizeVariants[size],
                className)}
            {...props}
        />
    )
}