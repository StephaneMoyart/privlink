'use client'

import { Calendar } from "@/components/calendar"
import { useActionState, useState } from "react"
import { createEventAction } from "./create.actions"
import { TimePicker } from "@/components/time-picket"
import { InputWLabel } from "@/components/input"
import { Checkbox } from "@/components/checkbox"

export const CreateEventForm = () => {
    const [displayEndDate, setDisplayEndDate] = useState(false)

    const [state, action, pending] = useActionState(createEventAction, null)

    return (
        <form className="w-full flex flex-col gap-2" action={action}>
            <div className="flex">
                <div className="w-1/2">
                    {state?.success && <p className="text-green-500">Evenement créé avec succès</p>}
                    {!state?.success && <p className="text-red-500">{state?.message}</p>}
                    <div className="flex flex-col gap-2">
                        <InputWLabel name="title" label="TITRE"/>
                        <InputWLabel name="description" label="DESCRIPTION DE L'EVENEMENT"/>
                    </div>

                    <Checkbox name="isFullDay">
                        Journées complètes
                    </Checkbox>

                    <Checkbox name="hasEndDate" signalIsChecked={setDisplayEndDate}>
                        Ajouter une date de fin
                    </Checkbox>

                    <div className="flex">
                        <div>
                            <Calendar dateName="startDate"/>
                            <TimePicker
                                hourName="startHours"
                                minuteName="startMinutes"
                            />
                        </div>

                        {displayEndDate &&
                            <div>
                                <Calendar dateName="endDate"/>
                                <TimePicker
                                    hourName="endHours"
                                    minuteName="endMinutes"
                                />
                            </div>
                        }
                    </div>
                </div>
            </div>
            <button
                disabled={pending}
            >
                Valider
            </button>
        </form>
    )
}