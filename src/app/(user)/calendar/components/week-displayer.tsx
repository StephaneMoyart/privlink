import { days } from "@/lib/consts"
import { ArrowLeft, ArrowRight } from "lucide-react"

export const WeekDisplayer = () => {
    return (
        <div className="flex flex-col gap-2 items-center p-2 w-full h-full border border-black/20 rounded-md shadow-black/20 shadow-sm">
            <div className="flex w-full justify-evenly gap-2 p-4">
                <ArrowLeft className="cursor-pointer" onClick={() => {

                }}/>
                <div className="flex gap-2 justify-center w-[150px]">
                    titre
                </div>
                <ArrowRight className="cursor-pointer" onClick={() => {

                }}/>
            </div>

            <div className="w-full text-center grid grid-cols-7">
                {days.map(day => (
                    <span key={day}>{day}</span>
                ))}
            </div>

            <div className="h-full w-full bg-pink-100">

            </div>

        </div>
    )
}