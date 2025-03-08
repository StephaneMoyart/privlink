'use client'

import { cn } from "@/lib/cn"
import { X } from "lucide-react"
import { createContext, use, useRef } from "react"

// Types
type DialogContext = {
    closeDialog: () => void
    openDialog: () => void
    dialogRef: React.RefObject<HTMLDialogElement | null>
}

type DialogProps = {
    children: React.ReactNode
}

type DialogContentProps = {
    children: React.ReactNode
}

type DialogTriggerProps = React.ButtonHTMLAttributes<HTMLButtonElement>

type DialogCloseProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    iconSize?: number
}

// Creating context, checking it and rendering it through a hook
const DialogContext = createContext<DialogContext | null>(null)

const useDialogContext = () => {
    const context = use(DialogContext)
    if (!context) throw new Error("useDialogContext must be used within a DialogContext provider")
    return context
}

// Components
export const Dialog: React.FC<DialogProps> = ({ children }) => {
    const dialogRef = useRef<HTMLDialogElement | null>(null)

    return (
        <DialogContext
            value={{
                closeDialog: () => dialogRef.current?.close(),
                openDialog: () => dialogRef.current?.showModal(),
                dialogRef
            }}
        >
            {children}
        </DialogContext>
    )
}

// Components
export const DialogContent: React.FC<DialogContentProps> = ({children}) => {
    const { dialogRef } = useDialogContext()
    const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => e.target === dialogRef.current && dialogRef.current?.close()

    return (
        <dialog
            className="m-auto p-6 pt-12 rounded shadow-lg backdrop:bg-black/25"
            ref={dialogRef}
            onClick={handleOutsideClick}
        >
            <div className="w-full h-full">
                {children}
            </div>
        </dialog>
    )
}

export const DialogClose: React.FC<DialogCloseProps> = ({ className, iconSize }) => {
    const { closeDialog } = useDialogContext()

    return (
        <button
            className={cn("absolute top-3 right-3 p-1 rounded hover:bg-stone-100", className)}
            onClick={closeDialog}
        >
            <X size={iconSize}/>
        </button>
    )
}

export const DialogTrigger: React.FC<DialogTriggerProps> = ({children, className}) => {
    const { openDialog } = useDialogContext()

    return (
        <button className={cn("", className)} onClick={openDialog}>
            {children}
        </button>
    )
}