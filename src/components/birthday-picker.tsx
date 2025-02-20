import { currentYear, months } from "@/lib/consts"
import { Select, SelectContent, SelectItem, SelectTrigger } from "./select"

type DayOfBirthProps = {
    selectedDay: string
    setSelectedDay: React.Dispatch<React.SetStateAction<string>>
}

type MonthOfBirthProps = {
    selectedMonth: string
    setSelectedMonth: React.Dispatch<React.SetStateAction<string>>
}

type YearOfBirthProps = {
    selectedYear: string
    setSelectedYear: React.Dispatch<React.SetStateAction<string>>
}

export const DayOfBirth: React.FC<DayOfBirthProps> = ({ selectedDay, setSelectedDay}) => {
    return (
        <Select value={selectedDay} onValueChange={value => setSelectedDay(value)}>
            <SelectTrigger className="w-[70px] text-xs">
                {selectedDay ? selectedDay : "Jour"}
            </SelectTrigger>
            <SelectContent className="w-[70px] max-h-[150px] overflow-y-scroll">
                {[...Array(31)].map((_, index) => (
                    <SelectItem className="text-xs" key={index} value={(index + 1).toString()}>
                        {index + 1}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export const MonthOfBirth: React.FC<MonthOfBirthProps> = ({ selectedMonth, setSelectedMonth }) => {
    return (
        <Select value={selectedMonth} onValueChange={value => setSelectedMonth(value)}>
            <SelectTrigger className="w-[110px] text-xs">
                {selectedMonth ? selectedMonth : "Mois"}
            </SelectTrigger>
            <SelectContent className="w-[110px] max-h-[150px] overflow-y-scroll">
                {months.map(month => (
                    <SelectItem className="text-xs" key={month} value={month}>
                        {month}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}

export const YearOfBirth: React.FC<YearOfBirthProps> = ({ selectedYear, setSelectedYear}) => {

    return (
        <Select value={selectedYear} onValueChange={value => setSelectedYear(value)}>
            <SelectTrigger className="w-[80px] text-xs">
                {selectedYear ? selectedYear : "Année"}
            </SelectTrigger>
            <SelectContent className="w-[80px] max-h-[150px] overflow-y-scroll">
                {[...Array(120)].map((_, index) => (
                    <SelectItem className="text-xs" key={index} value={(currentYear - index).toString()}>
                        {(currentYear - index)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    )
}