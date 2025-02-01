import { cn } from "@/lib/cn"
import { useState } from "react"

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement> & {
    signalIsChecked?: (isChecked: boolean) => void
}

export const Checkbox: React.FC<CheckboxProps> = ({ signalIsChecked, children, className, ...props }) => {
    const [isChecked, setIsChecked] = useState(false)

    const handleCheck = () => {
        const checkedState = !isChecked
        setIsChecked(checkedState)
        if (signalIsChecked) signalIsChecked(checkedState)
    }

  return (
    <label className="flex gap-2 items-center max-w-fit">
        <input
            className="sr-only"
            type="checkbox"
            checked={isChecked}
            onChange={handleCheck}
            {...props}
        />
        <span className={cn(
            "flex items-center justify-center h-5 w-5 border border-black/20 text-white rounded-sm shadow transition-all",
            isChecked && "border-zinc-800 bg-zinc-950",
            className
        )}>
            <svg className="stroke-current w-3 h-3" viewBox="0 0 18 18">
                <polyline
                    points="1 9 7 14 15 4"
                    fill="none"
                    strokeWidth={3}
                    strokeDasharray={22}
                    strokeDashoffset={isChecked ? 44 : 66}
                    style={{
                    transition: "all 400ms"
                    }}
                />
            </svg>
        </span>

        {children}
    </label>
  )
}