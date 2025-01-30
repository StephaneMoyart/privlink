const DateFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long'
})

const DateWithYearFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
})

const TimeFormatter = new Intl.DateTimeFormat('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
})

export const handleEventDateDisplay = (rawStartDate, rawEndDate, isFullDay) => {
    const hasEndDate = rawEndDate !== null

    const startDate = new Date(rawStartDate)
    const endDate = hasEndDate ? new Date(rawEndDate) : null
    const now = new Date()

    const actualYear = now.getFullYear()
    const startDateYear = startDate.getFullYear()
    const endDateYear = endDate?.getFullYear()
    const startDateMonth = startDate.getMonth()
    const endDateMonth = endDate?.getMonth()
    const startDateDay = startDate.getDate()
    const endDateDay = endDate?.getDate()

    const formattedStartTime = TimeFormatter.format(startDate)
    const formattedStartDate = DateFormatter.format(startDate)
    const formattedStartDateWithYear = DateWithYearFormatter.format(startDate)

    const formattedEndTime = hasEndDate ? TimeFormatter.format(endDate as Date) : null
    const formattedEndDate = hasEndDate ? DateFormatter.format(endDate as Date) : null
    const formattedEndDateWithYear = hasEndDate ? DateWithYearFormatter.format(endDate as Date) : null

    const startDateMonthString = formattedStartDate.split(' ')[1]
    const endDateMonthString = formattedEndDate?.split(' ')[1]
    const startDateDayString = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(startDate)
    const endDateDayString = new Intl.DateTimeFormat('fr-FR', { weekday: 'long' }).format(endDate)

    const endOfToday = new Date()
    endOfToday.setHours(24, 0, 0, 0)

    const endOfTomorrow = new Date(endOfToday)
    endOfTomorrow.setDate(endOfToday.getDate() + 1)

    const endOfWeek = new Date(now)
    endOfWeek.setDate(now.getDate() + (7 - now.getDay()))
    endOfWeek.setHours(24, 0, 0, 0)

    const endOfYear = new Date(now.getFullYear(), 11, 31, 23, 59, 59, 999)

    switch(true) {
        case hasEndDate && endDate < now :
            return `Terminé`
        case startDate < now && endDate > now :
            switch(true) {
                case isFullDay :
                    switch(true) {
                        case endDate < endOfToday :
                            return `En cours - Termine Aujourd'hui`
                        case endDate < endOfTomorrow :
                            return `En cours - Termine demain`
                        case endDate < endOfWeek :
                            return `En cours - Termine ${endDateDayString}`
                        default :
                            return `En cours -Termine le ${formattedEndDate}`
                    }
                case !isFullDay :
                    switch(true) {
                        case endDate < endOfToday :
                            return `En cours - Termine Aujourd'hui ${formattedEndTime}`
                        case endDate < endOfTomorrow :
                            return `En cours - Termine demain ${formattedEndTime}`
                        case endDate < endOfWeek :
                            return `En cours - Termine ${endDateDayString} ${formattedEndTime}`
                        default :
                            return `En cours -Termine le ${formattedEndDate} ${formattedEndTime}`
                    }
            }
        case !hasEndDate && isFullDay :
            switch(true) {
                case startDate <= endOfToday :
                    return `Aujourd'hui`
                case startDate < endOfTomorrow :
                    return `Demain`
                case startDate < endOfWeek :
                    return `${startDateDayString}`
                case startDate <= endOfYear :
                    return `Le ${formattedStartDate}`
                default :
                    return `Le ${formattedStartDateWithYear}`
            }
        case !hasEndDate && !isFullDay:
            switch(true) {
                case startDate <= endOfToday :
                    return `Aujourd'hui à ${formattedStartTime}`
                case startDate <= endOfTomorrow :
                    return `Demain à ${formattedStartTime}`
                case startDate < endOfWeek :
                    return `${startDateDayString} à ${formattedStartTime}`
                case startDate <= endOfYear :
                    return `Le ${formattedStartDate} à ${formattedStartTime}`
                default :
                    return `Le ${formattedStartDateWithYear} à ${formattedStartTime}`
            }
        case hasEndDate && isFullDay:
            switch(true) {
                case startDate < endOfToday && endDate < endOfTomorrow :
                    return `Aujourd'hui - Demain`
                case startDate < endOfToday && endDate < endOfWeek:
                    return `Aujourd'hui - ${endDateDayString}`
                case startDate < endOfTomorrow && endDate < endOfWeek :
                    return `Demain - ${endDateDayString}`
                case startDate < endOfWeek && endDate < endOfWeek :
                    return `${startDateDayString} - ${endDateDayString}`
                case endDateYear === actualYear :
                    switch(true) {
                        case startDateMonth === endDateMonth :
                            return `${startDateDay} - ${endDateDay} ${endDateMonthString}`
                        case startDateMonth !== endDateMonth :
                            return `${startDateDay} ${startDateMonthString} - ${endDateDay} ${endDateMonthString}`
                    }
                case endDateYear as number > actualYear :
                    switch(true) {
                        case startDateYear === endDateYear :
                            switch(true) {
                                case startDateMonth === endDateMonth :
                                    return `${startDateDay} - ${formattedEndDateWithYear}`
                                case startDateMonth !== endDateMonth :
                                    return `${formattedStartDate} - ${formattedEndDateWithYear}`
                            }
                        case endDateYear as number > startDateYear   :
                            return `${formattedStartDateWithYear} - ${formattedEndDateWithYear}`
                    }
            }
        case hasEndDate && !isFullDay:
            switch(true) {
                case startDate < endOfToday && endDate < endOfToday :
                    return `Aujourd'hui ${formattedStartTime} - ${formattedEndTime}`
                case startDate < endOfToday && endDate < endOfTomorrow :
                    return `Aujourd'hui ${formattedStartTime} - Demain ${formattedEndTime}`
                case startDate < endOfToday && endDate < endOfWeek:
                    return `Aujourd'hui ${formattedStartTime} - ${endDateDayString} ${formattedEndTime}`
                case startDate < endOfTomorrow && endDate < endOfWeek :
                    return `Demain ${formattedStartTime} - ${endDateDayString} ${formattedEndTime}`
                case startDate < endOfWeek && endDate < endOfWeek :
                    return `${startDateDayString} ${formattedStartTime} - ${endDateDayString} ${formattedEndTime}`
                case endDateYear === actualYear :
                    return `${formattedStartDate} ${formattedStartTime} - ${formattedEndDate} ${formattedEndTime}`
                case endDateYear as number > actualYear :
                    return `${formattedStartDateWithYear} ${formattedStartTime} - ${formattedEndDateWithYear} ${formattedEndTime}`
            }
    }
}