'use client'

import { useActionState, useState } from "react"
import { createEventAction } from "./create.actions"
import { TimePicker } from "@/components/time-picker"
import { InputWLabel } from "@/components/input-w-label"
import { Checkbox } from "@/components/checkbox"
import { Button } from "@/components/button"
import { DatePicker } from "@/components/date-picker"

export const CreateEventForm = () => {
    const [displayEndDate, setDisplayEndDate] = useState(false)
    const [displayTimePicker, setDisplayTimePicker] = useState(false)

    const [state, action, pending] = useActionState(createEventAction, null)

    return (
        <form className="w-full h-full flex flex-col justify-between gap-2" action={action}>
            <div className="flex">
                <div className="flex flex-col gap-2 w-1/2">
                    {state?.success && <p className="text-green-500">Evenement créé avec succès</p>}
                    {!state?.success && <p className="text-red-500">{state?.message}</p>}
                    <div className="flex flex-col gap-2">
                        <InputWLabel name="title" label="TITRE"/>
                        <InputWLabel name="description" label="DESCRIPTION DE L'EVENEMENT"/>
                    </div>

                    <div className="grid w-full grid-cols-2 grid-rows-[auto, auto] gap-4">
                        <Checkbox name="isFullDay" signalIsChecked={setDisplayTimePicker}>
                            Journées complètes
                        </Checkbox>

                        <Checkbox name="hasEndDate" signalIsChecked={setDisplayEndDate}>
                            Ajouter une date de fin
                        </Checkbox>

                        <div className="flex gap-2 w-fit">
                            <DatePicker dateName="startDate"/>
                            {!displayTimePicker &&
                                <TimePicker
                                    hourName="startHours"
                                    minuteName="startMinutes"
                                />
                            }
                        </div>

                        {displayEndDate &&
                            <div className="flex gap-2 w-fit">
                                <DatePicker dateName="endDate"/>
                                {!displayTimePicker &&
                                    <TimePicker
                                        hourName="endHours"
                                        minuteName="endMinutes"
                                    />
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
            <Button
                pending={pending}
                disabled={pending}
            >
                Valider
            </Button>
        </form>
    )
}