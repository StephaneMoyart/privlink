const DateWithYearFormatter = new Intl.DateTimeFormat('fr-FR', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
})

export const formatCalendarDate = (date: Date) => {
    return DateWithYearFormatter.format(date)
}