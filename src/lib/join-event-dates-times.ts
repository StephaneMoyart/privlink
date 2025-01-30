const joinDateTime = (date, hours, minutes) => {
    const d = new Date(date)
    d.setHours(Number(hours))
    d.setMinutes(Number(minutes))
    return d
}

export const joinEventDatesandTimes= (rawData: {[k: string]: FormDataEntryValue}) => {
    const { startDate: rawStartDate, startHours, startMinutes, endDate: rawEndDate, endHours, endMinutes, isFullDay: rawIsFullDay, hasEndDate: rawHasEndDate } = rawData

    const isFullDay = rawIsFullDay === 'on'
    const hasEndDate = rawHasEndDate === 'on'

    if (isFullDay) {
        const startDate = new Date(rawStartDate)
        const endDate = hasEndDate ? new Date(rawEndDate) : null

        return { startDate, endDate, isFullDay }
    }

    const startDate = joinDateTime(rawStartDate, startHours, startMinutes)
    const endDate = hasEndDate ? joinDateTime(rawEndDate, endHours, endMinutes) : null

    return {startDate, endDate, isFullDay}
}