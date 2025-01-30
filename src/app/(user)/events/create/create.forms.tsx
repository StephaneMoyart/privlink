'use client'

import { Calendar } from "@/components/calendar"
import { useActionState, useState } from "react"
import { createEventAction } from "./create.actions"
import { TimePicker } from "@/components/time-picket"

export const CreateEventForm = () => {
    const [displayEndDate, setDisplayEndDate] = useState(false)

    const handleCheckedChange = () => {
        setDisplayEndDate(prev => !prev)
    }

    const [state, action, pending] = useActionState(createEventAction, null)

    return (
        <form className="w-full flex flex-col gap-2" action={action}>
            <div className="flex">
                <div className="w-1/2">
                    {state?.success && <p className="text-green-500">Evenement créé avec succès</p>}
                    {!state?.success && <p className="text-red-500">{state?.message}</p>}
                    <input
                        name="name"
                        placeholder="Nom de l'evenement"
                    />
                    <textarea
                        name="description"
                        placeholder="Description de l'evenement"
                    />

                    <div>
                        <input
                            type="checkbox"
                            name="isFullDay"
                            id="isFullDay"
                        />
                        <label htmlFor="isFullDay">Journées entières</label>
                    </div>

                    <div>
                        <input
                            type="checkbox"
                            onChange={handleCheckedChange}
                            name="hasEndDate"
                            id="hasEndDate"
                        />
                        <label htmlFor="hasEndDate">Ajouter une date de fin</label>
                    </div>

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