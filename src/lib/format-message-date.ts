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

export const formatMessageDateAndTime = (rawDate: string | NativeDate) => {
    const d = new Date(rawDate)


    const formattedDate = DateFormatter.format(d)
    const formattedDateWithYear = DateWithYearFormatter.format(d)
    const formattedTime = TimeFormatter.format(d)

    const now = new Date()
    const timeDiff = now.getTime() - d.getTime()
    const minutesDiff = Math.floor(timeDiff / 60000)

    const startOfToday = new Date()
    startOfToday.setHours(0, 0, 0, 0)

    const startOfYesterday = new Date(startOfToday)
    startOfYesterday.setDate(startOfToday.getDate() - 1)

    const isSameYear = d.getFullYear() === now.getFullYear()

    switch(true) {
        case timeDiff < 60000 :
            return 'Il y a moins d\'une minute'
        case timeDiff < 3600000 :
            return `Il y a ${minutesDiff} minute${minutesDiff > 1 ? "s": ""}`
        case d >= startOfToday :
            return `Aujourd'hui à ${formattedTime}`
        case d >= startOfYesterday :
            return `Hier à ${formattedTime}`
        default :
            return isSameYear
                ? `${formattedDate} à ${formattedTime}`
                : `${formattedDateWithYear} à ${formattedTime}`
    }
}