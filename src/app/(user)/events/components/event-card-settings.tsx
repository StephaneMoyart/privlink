'use client'

import { Ellipsis, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import { deleteEventAction } from "../events.actions"
import { Button } from "@/components/button"

export const EventCardSettings = ({ eventId }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [pending, setEventDeleteTransition] = useTransition()

    return (
        <div className="relative w-18">
            { isVisible ?
                <div className="absolute top-0 right-0 flex flex-col gap-2 shadow rounded-md p-2 z-10 bg-white">
                    <div className="px-2">
                        <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                    </div>
                    <Button
                        color="red"
                        disabled={pending}
                        pending={pending}
                        icon
                        onClick={() => setEventDeleteTransition(() => deleteEventAction(eventId))}
                    >
                        <Trash/>
                    </Button>
                </div>
                :
                <div className="flex justify-center p-2">
                    <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                </div>
            }
        </div>
    )
}