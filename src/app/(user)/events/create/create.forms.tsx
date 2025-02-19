'use client'

import { useActionState, useState } from "react"
import { createEventAction } from "./create.actions"
import { TimePicker } from "@/components/time-picker"
import { InputWLabel } from "@/components/input-w-label"
import { Checkbox } from "@/components/checkbox"
import { Button } from "@/components/button"
import { DatePicker } from "@/components/date-picker"
import { ContactSelector } from "@/feats/contact-selector/contact-selector"
import { Contact } from "@/data/get-contacts"

type CreateEventFormProps = {
    contacts: Contact[]
}

export const CreateEventForm: React.FC<CreateEventFormProps>  = ({ contacts }) => {
    const [displayEndDate, setDisplayEndDate] = useState(false)
    const [displayTimePicker, setDisplayTimePicker] = useState(false)
    const [invitedUsers, setInvitedUsers] = useState<string[]>([])

    const [state, action, pending] = useActionState(createEventAction.bind(null, invitedUsers), null)

    return (
        <form className="w-full h-full flex flex-col justify-between gap-2" action={action}>
            <div className="max-md:flex-col flex gap-8 md:w-full">
                <div className="max-md:flex-col flex min-w-[50%] shrink-0">
                    <div className="flex flex-col w-full gap-2">
                        {state?.success && <p className="text-green-500">Evenement créé avec succès</p>}
                        {!state?.success && <p className="text-red-500">{state?.message}</p>}
                        <div className="flex flex-col gap-2">
                            <InputWLabel name="title" label="TITRE"/>
                            <InputWLabel name="description" label="DESCRIPTION DE L'EVENEMENT"/>
                        </div>

                        <div className="grid w-full grid-cols-1 md:grid-cols-2 grid-rows-[auto, auto] gap-4">
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

                <div className="w-full space-y-2">
                    <p className="p-2 font-semibold">Ajoutez des contacts à l&apos;évenement</p>
                    <ContactSelector contacts={contacts} setMembers={setInvitedUsers}/>
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