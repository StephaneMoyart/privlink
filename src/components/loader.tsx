import { cn } from "@/lib/cn"

type LoaderProps = React.HTMLProps<HTMLDivElement>

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn("animate-spin border-t border-b border-white w-4 h-4 rounded-full",
                className
            )}
            {...props}
        />
    )
}