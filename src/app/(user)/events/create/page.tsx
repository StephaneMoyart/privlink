import { CreateEventForm } from "./create.forms";

const Page = async () => {

    return (
        <div className="w-full flex flex-col gap-2 p-2 overflow-y-scroll">
            <CreateEventForm/>
        </div>
    )
}

export default Page