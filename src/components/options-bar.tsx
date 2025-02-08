import { cn } from "@/lib/cn"

export const OptionsBar: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className }) => {
    return (
        <div className={cn("flex items-center p-2 border-b shadow -m-4 mb-0", className)}>
            {children}
        </div>
    )
}