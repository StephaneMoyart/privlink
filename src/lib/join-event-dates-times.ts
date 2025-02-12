const joinDateTime = (date: FormDataEntryValue, hours: FormDataEntryValue, minutes: FormDataEntryValue) => {
    const d = new Date(date as string)
    d.setHours(Number(hours))
    d.setMinutes(Number(minutes))
    return d
}

export const joinEventDatesandTimes= (rawData: {[k: string]: FormDataEntryValue}) => {
    const { startDate: rawStartDate, startHours, startMinutes, endDate: rawEndDate, endHours, endMinutes, isFullDay: rawIsFullDay, hasEndDate: rawHasEndDate } = rawData

    const isFullDay = rawIsFullDay === 'on'
    const hasEndDate = rawHasEndDate === 'on'

    if (isFullDay) {
        const startDate = rawStartDate
        const endDate = hasEndDate ? rawEndDate : null

        return { startDate, endDate, isFullDay }
    }

    const startDate = joinDateTime(rawStartDate, startHours, startMinutes)
    const endDate = hasEndDate ? joinDateTime(rawEndDate, endHours, endMinutes) : null

    return {startDate, endDate, isFullDay}
}