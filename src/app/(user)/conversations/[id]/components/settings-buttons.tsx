'use client'

import { Ellipsis, Pencil, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import { deleteMessageAction } from "../conversation.actions"

export const MessageSettings = ({ conversationId, messageId, setIsEditing }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [pendingDelete, startDeleteTransition] = useTransition()

    return (
        <div className="relative w-18">
            { isVisible ?
                <div className="absolute top-0 right-0 flex flex-col gap-2 shadow rounded-md p-2 z-10 bg-white">
                    <div className="px-2">
                        <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                    </div>
                    <button onClick={() => setIsEditing(true)} className="flex justify-center items-center h-12 shadow rounded-md cursor-pointer bg-yellow-500 border border-yellow-400 hover:bg-yellow-600 hover:border-yellow-500 transition-colors duration-300">
                        <Pencil/>
                    </button>
                    <button disabled={pendingDelete} onClick={() => startDeleteTransition(() => deleteMessageAction(conversationId, messageId))} className="flex justify-center items-center h-12 shadow rounded-md cursor-pointer bg-red-500 border border-red-400 hover:bg-red-600 hover:border-red-500 transition-colors duration-300">
                        {pendingDelete ?
                            <div className="animate-spin border-t border-b border-black w-4 h-4 rounded-full"></div>
                            :
                            <Trash/>
                        }
                    </button>
                </div>
                :
                <div className="flex justify-center p-2">
                    <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                </div>
            }
        </div>
    )
}