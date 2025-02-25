import { cn } from "@/lib/cn"
import { LoaderCircle } from "lucide-react"

type LoaderProps = React.HTMLProps<HTMLDivElement>

export const Loader: React.FC<LoaderProps> = ({ className, ...props }) => {
    return (
        <div
            className={cn("animate-spin",
                className
            )}
            {...props}
        >
            <LoaderCircle/>
        </div>
    )
}