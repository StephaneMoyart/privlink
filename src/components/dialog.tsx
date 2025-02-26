import { cn } from "@/lib/cn";
import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

const { Root, Trigger, Portal, Overlay, Content, Title, Description, Close } = DialogPrimitive

export const Dialog = Root

export const DialogContent: React.FC<React.ComponentProps<typeof DialogPrimitive.Content>> = ({ children }) => {
	return (
		<Portal>
			<Overlay className="fixed inset-0 backdrop-blur-xs"/>
				<Content className="fixed p-8 top-1/2 left-1/2 -translate-[50%] shadow-lg overflow-hidden bg-white rounded-lg max-w-[90%]">
				<div className="absolute top-0 left-0 h-1 bg-stone-950 w-full"/>
					<Close className="p-2 absolute top-3 right-2 rounded text-stone-950 hover:bg-stone-100">
						<X size={20}/>
					</Close>
					{children}
				</Content>
		</Portal>
	)
}

export const DialogTitle: React.FC<React.ComponentProps<typeof DialogPrimitive.Title>> = ({ children, className }) => {
	return(
		<Title className={cn("text-xl py-4", className)}>
			{ children }
		</Title>
	)
}

export const DialogTrigger: React.FC<React.ComponentProps<typeof DialogPrimitive.Trigger>> = ({ children, className }) => {
	return (
		<Trigger className={className}>
			{ children }
		</Trigger>
	)
}

export const DialogDescription: React.FC<React.ComponentProps<typeof DialogPrimitive.Description>> = ({ children }) => {
	return (
		<Description>
			{ children }
		</Description>
	)
}