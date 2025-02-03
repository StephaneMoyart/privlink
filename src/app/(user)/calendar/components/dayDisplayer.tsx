export const DayDisplayer = ({ events }) => {
    console.log(events);


    return (
        <div className="flex flex-col gap-2 w-full bg-yellow-300">
            {Array.from({ length: 24 }).map((_, index) => (
                <div key={index} className="w-full h-15 bg-blue-200">

                </div>
            ))}
        </div>
    )
}