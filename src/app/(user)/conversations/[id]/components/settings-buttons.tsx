'use client'

import { Ellipsis, Pencil, Trash } from "lucide-react"
import { useState } from "react"

export const MessageSettings = () => {
    const [isVisible, setIsVisible] = useState(false)

    return (
        <div className="relative">
            { isVisible ?
                <div className="absolute top-0 right-0 flex flex-col gap-2 shadow rounded-md p-2 z-10 bg-white">
                    <div className="px-2">
                        <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                    </div>
                    <button className="flex justify-center p-2 shadow rounded-md cursor-pointer bg-yellow-500 border border-yellow-400 hover:bg-yellow-600 hover:border-yellow-500 transition-colors duration-300">
                        <Pencil/>
                    </button>
                    <button className="flex justify-center p-2 shadow rounded-md cursor-pointer bg-red-500 border border-red-400 hover:bg-red-600 hover:border-red-500 transition-colors duration-300">
                        <Trash/>
                    </button>
                </div>
                :
                <div className="py-2 px-4">
                    <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                </div>
            }
        </div>
    )
}