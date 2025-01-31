'use client'

import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

const options = ["Jour", "Semaine", "Mois", "Année"]

export const DisplaySelector = () => {
    const [selected, setSelected] = useState<string>(options[1])
    const [isVisible, setIsVisible] = useState<boolean>(false)

    return (
        <div className="flex flex-col gap-2 shadow min-w-[150px] max-w-fit">
            <div onClick={() => setIsVisible(prev => !prev)} className="flex gap-2 justify-center font-semibold py-2 px-4 cursor-pointer">
                {selected}
                <ChevronDown/>
            </div>

            {isVisible &&
                <div>
                    {options.map((option, index) => (
                        <p
                            key={index}
                            onClick={() => {
                                setSelected(option)
                                setIsVisible(prev => !prev)
                            }}
                            className="flex gap-2 justify-between items-center hover:bg-black/20 py-2 px-4 cursor-pointer"
                        >
                            {option}
                            {selected === option && <span className="inline-block"><Check size={15}/></span>}
                        </p>
                    ))}
                </div>
            }
        </div>
    )
}