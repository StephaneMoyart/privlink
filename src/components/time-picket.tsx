import { cn } from "@/lib/cn"
import { useState } from "react"

type TimeValue = number | "--"

type TimePickerProps = {
    hourName: string
    minuteName: string
}

export const TimePicker: React.FC<TimePickerProps> = ({ hourName, minuteName }) => {
    const [hours, setHours] = useState<TimeValue>("--")
    const [minutes, setMinutes] = useState<TimeValue>("--")
    const [hoursVisible, setHoursVisible] = useState(false)
    const [minutesVisible, setMinutesVisible] = useState(false)

    return (
        <div className="flex gap-2">
            <div className="flex flex-col gap-1">
                <input
                    onClick={() => setHoursVisible(!hoursVisible)}
                    className={cn("text-center w-[60px] h-12 px-4 border outline-none rounded-sm border-black/20 shadow cursor-pointer",
                        !hoursVisible && "hover:bg-black/20"
                    )}
                    name={hourName} value={hours} type="text" readOnly
                />

                {hoursVisible &&
                    <div className="max-h-[150px] overflow-y-scroll p-2 border border-black/20 rounded-md shadow-black/20 shadow-sm">
                        {[...Array(24)].map((_, index) => (
                            <span
                                className="w-full py-0.5 hover:font-semibold hover:cursor-pointer block text-center"
                                key={index}
                                onClick={() => {
                                    setHours(index)
                                    setHoursVisible(false)
                                }}
                            >
                                {index}
                            </span>
                        ))}
                    </div>
                }
            </div>

            <div className="flex flex-col">
                <div className="flex flex-col gap-1">
                    <input
                        onClick={() => setMinutesVisible(!minutesVisible)}
                        className={cn("text-center w-[60px] h-12 px-4 border outline-none rounded-sm border-black/20 shadow cursor-pointer",
                            !minutesVisible && "hover:bg-black/20"
                        )}
                        name={minuteName} value={minutes} type="text" readOnly
                    />

                    {minutesVisible &&
                        <div className="max-h-[150px] overflow-y-scroll p-2 border border-black/20 rounded-md shadow-black/20 shadow-sm">
                            {[...Array(60)].map((_, index) => (
                                <span
                                    className="w-full py-0.5 hover:font-semibold hover:cursor-pointer block text-center"
                                    key={index}
                                    onClick={() => {
                                        setMinutes(index)
                                        setMinutesVisible(false)
                                    }}
                                >
                                    {index}
                                </span>
                            ))}
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}