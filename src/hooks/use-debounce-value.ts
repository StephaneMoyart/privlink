import { useEffect, useState } from "react"

export const useDebounceValue = <T>(value: T, time = 250): T => {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timeOut = setTimeout(() => {
            setDebouncedValue(value)
        }, time)

        return () => clearTimeout(timeOut)
    }, [value, time])

    return debouncedValue
}