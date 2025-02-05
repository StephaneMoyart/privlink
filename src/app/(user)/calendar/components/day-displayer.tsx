export const DayDisplayer = () => {
    return (
        <div>affichage jour</div>
    )
}

// export const DayDisplayer = ({ events }) => {
//     const todayString = new Date().toLocaleDateString()

//     const todayEvents = events.filter(event => {
//         const startDateString = new Date(event.startDate).toLocaleDateString()
//         const endDateString = event.endDate ? new Date(event.endDate).toLocaleDateString() : null

//         return startDateString === todayString || endDateString === todayString;
//     })

//     const eventsDisplayer = todayEvents.map(event => {
//         const startTime = (new Date(event.startDate).getHours()*60 + new Date(event.startDate).getMinutes())
//         const endTime = event.endDate ? (new Date(event.endDate).getHours()*60 + new Date(event.endDate).getMinutes()) : 1440
//         const totalTime = endTime - startTime
//         const title = event.title

//         return  { totalTime, startTime, title }
//     })



//     console.log("lalala", todayEvents);

//     return (
//         <div className="relative h-[1440px] w-full bg-yellow-300">
//             {eventsDisplayer.map((event, index) => (
//                 <div key={index} className="bg-transparent border border-black absolute left-0 w-full flex items-center justify-center" style={{ top: `${event.startTime}px`, height: `${event.totalTime}px` }}>
//                     {event.title}
//                 </div>
//             ))}
//         </div>
//     )
// }