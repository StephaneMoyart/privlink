import { cn } from "@/lib/cn";
import { Check, ChevronDown } from "lucide-react";
import { Select as SelectPrimitive } from "radix-ui";

const { Root, Trigger, Group, Portal, Content, Item, ItemIndicator, Icon } = SelectPrimitive

export const Select = Root
export const SelectGroup = Group

export const SelectTrigger: React.FC<React.ComponentProps<typeof SelectPrimitive.Trigger>> = ({ children, className }) => {
    return (
        <Trigger className={cn("outline-none p-2 flex justify-between items-center max-w-fit min-w-[150px] shadow rounded", className)}>
            {children}
            <Icon>
                <ChevronDown size={15}/>
            </Icon>
        </Trigger>
    )
}

export const SelectContent: React.FC<React.ComponentProps<typeof SelectPrimitive.Content>> = ({ children, className }) => {
    return (
        <Portal>
            <Content position="popper" className={cn("bg-white text-black mt-1 shadow w-[150px] p-1 rounded", className)}>
                {children}
            </Content>
        </Portal>
    )
}

export const SelectItem: React.FC<React.ComponentProps<typeof SelectPrimitive.Item>> = ({ value, children, className }) => {
    return (
        <Item className={cn("flex justify-between items-center p-2 cursor-pointer hover:bg-gray-200 outline-none rounded", className)} value={value}>
            {children}
            <ItemIndicator>
                <Check size={15}/>
            </ItemIndicator>
        </Item>
    )
}