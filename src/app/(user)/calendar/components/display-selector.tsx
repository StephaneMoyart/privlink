'use client'

import { Check, ChevronDown } from "lucide-react"
import { useState } from "react"

const options = [
    {
        name: "Jour",
        value: "day"
    },
    {
        name: "Semaine",
        value: "week"
    },
    {
        name: "Mois",
        value: "month"
    }
]

export const DisplaySelector = ({ setDisplay }) => {
    const [selected, setSelected] = useState<string>(options[2].name)
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
                                setSelected(option.name)
                                setDisplay(option.value)
                                setIsVisible(prev => !prev)
                            }}
                            className="flex gap-2 justify-between items-center hover:bg-black/20 py-2 px-4 cursor-pointer"
                        >
                            {option.name}
                            {selected === option.name && <span className="inline-block"><Check size={15}/></span>}
                        </p>
                    ))}
                </div>
            }
        </div>
    )
}