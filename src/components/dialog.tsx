import { X } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";

const { Root, Trigger, Portal, Overlay, Content, Title, Description, Close } = DialogPrimitive

export const Dialog = Root

export const DialogContent: React.FC<React.ComponentProps<typeof DialogPrimitive.Content>> = ({ children }) => {
	return (
		<Portal>
			<Overlay className="fixed inset-0 bg-black/50"/>
				<Content className="p-8 fixed top-1/2 left-1/2 -translate-[50%] shadow bg-white rounded-md">
					<Close className="absolute top-2 right-2">
						<X size={20}/>
					</Close>
					{children}
				</Content>
		</Portal>
	)
}

export const DialogTitle: React.FC<React.ComponentProps<typeof DialogPrimitive.Title>> = ({ children }) => {
	return(
		<Title className="text-xl py-4">
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