'use client'

import { Ellipsis, Pencil, Trash } from "lucide-react"
import { useState, useTransition } from "react"
import { deleteMessageAction } from "../conversation.actions"

export const MessageSettings = ({ conversationId, messageId }) => {
    const [isVisible, setIsVisible] = useState(false)
    const [pendingDelete, startDeleteTransition] = useTransition()
    const [pendingEdit, startEditTransition] = useTransition()


    return (
        <div className="relative">
            { isVisible ?
                <div className="absolute top-0 right-0 flex flex-col gap-2 shadow rounded-md p-2 z-10 bg-white">
                    <div className="px-2">
                        <Ellipsis size={35} onClick={() => setIsVisible(prev => !prev)} className="not-hover:opacity-75 not-hover:scale-80 transition-all cursor-pointer"/>
                    </div>
                    <button disabled={pendingEdit} onClick={() => startEditTransition({})} className="flex justify-center items-center p-2 h-12 shadow rounded-md cursor-pointer bg-yellow-500 border border-yellow-400 hover:bg-yellow-600 hover:border-yellow-500 transition-colors duration-300">
                        {pendingEdit ?
                            <div className="animate-spin border-t border-b border-black w-4 h-4 rounded-full"></div>
                            :
                            <Pencil/>
                        }
                    </button>
                    <button disabled={pendingDelete} onClick={() => startDeleteTransition(() => deleteMessageAction(conversationId, messageId))} className="flex justify-center items-center p-2 h-12 shadow rounded-md cursor-pointer bg-red-500 border border-red-400 hover:bg-red-600 hover:border-red-500 transition-colors duration-300">
                        {pendingDelete ?
                            <div className="animate-spin border-t border-b border-black w-4 h-4 rounded-full"></div>
                            :
                            <Trash/>
                        }
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