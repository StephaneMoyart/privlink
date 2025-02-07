'use client'

import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/select"
import { SetStateAction, useState } from "react"

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

type DisplaySelectorProps = {
    setDisplay: React.Dispatch<SetStateAction<string>>
}

export const DisplaySelector: React.FC<DisplaySelectorProps> = ({ setDisplay }) => {
    const [selected, setSelected] = useState<string>(options[2].name)

    return (
        <Select value={selected} onValueChange={value => {
            const selectedOption = options.find(option => option.value === value)
            if (selectedOption) setSelected(selectedOption.name)
            setDisplay(value)
        }}>
            <SelectTrigger className="flex items-center justify-between p-2 border rounded-md">
                {selected}
            </SelectTrigger>

            <SelectContent>
                {options.map((option, index) => (
                    <SelectItem key={index} value={option.value}>
                        {option.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}