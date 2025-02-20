import { cn } from "@/lib/cn";
import { DropdownMenu } from "radix-ui";

const { Root, Trigger, Portal, Content } = DropdownMenu

export const Dropdown = Root

export const DropdownTrigger = Trigger

export const DropdownContent: React.FC<React.ComponentProps<typeof DropdownMenu.Content>> = ({ className, children }) => {
    return (
        <Portal>
            <Content className={cn("flex flex-col gap-1 rounded shadow p-1 bg-white", className)}>
                {children}
            </Content>
        </Portal>
    )
}