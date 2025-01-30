import { useState } from "react"

type TimeValue = number | "--"

type TimePickerProps = {
    hourName: string
    minuteName: string
}

export const TimePicker: React.FC<TimePickerProps> = ({ hourName, minuteName }) => {
    const [hours, setHours] = useState<TimeValue>("--")
    const [minutes, setMinutes] = useState<TimeValue>("--")

    return (
        <div className="flex gap-2">
            <div className="flex flex-col">
                <input className="w-12 text-center cursor-pointer" name={hourName} value={hours} type="text" readOnly/>
                <div className="max-h-[100px] overflow-y-scroll">
                    {[...Array(24)].map((_, index) => (
                        <span className="block" key={index} onClick={() => setHours(index)}>{index}</span>
                    ))}
                </div>
            </div>
            <p>:</p>
            <div className="flex flex-col">
                <input className="w-12 text-center cursor-pointer" name={minuteName} value={minutes} type="text" readOnly/>
                <div className="max-h-[100px] overflow-y-scroll">
                    {[...Array(60)].map((_, index) => (
                        <span className="block" key={index} onClick={() => setMinutes(index)}>{index}</span>
                    ))}
                </div>
            </div>
        </div>
    )
}