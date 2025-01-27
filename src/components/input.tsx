'use client'

import { useState } from "react"

type InputProps = {
    name: string
    label: string
    type?: string
}

export const InputWLabel: React.FC<InputProps> = ({ name, label, type = "text", state }) => {
    const [hasValue, setHasValue] = useState(false)

    return (
        <div className="relative">
            <input
                id={name}
                className="peer w-full mb-2 border bg-white border-black/20 rounded-md h-12 px-4 outline-none focus:border-zinc-950 transition-all duration-300 autofill:shadow-[inset_0_0_0px_1000px_rgb(255,255,255)]"
                type={type}
                name={name}
                required
                onChange={(e) => setHasValue(!!(e.target.value !== ''))}
                autoComplete="new-password"
            />
            <label
                htmlFor={name}
                className={`absolute left-4 top-3.5 px-2 bg-white text-zinc-500 text-sm transition-all cursor-text
                    ${hasValue ? 'top-[-10px] text-xs' : 'top-3 text-base'}
                    peer-focus:top-[-10px] peer-focus:text-xs peer-focus:text-zinc-950
                `}
            >
                {label}
            </label>
            {state?.errors?.[name] && <p className="text-red-500">{state.errors[name]}</p>}
        </div>
    )
}