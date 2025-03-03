'use server'

import path from "path"
import fs from 'fs'
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getSession } from "@/auth/session"
import { query } from "@/db/db"
import { months } from "@/lib/consts"

const editBirthDaySchema = z.object({
    day: z.string().max(2),
    month: z.string().max(9),
    year: z.string().max(4)
})

const uploadAvatarSchema = z.instanceof(File).refine(file => [
        "image/png",
        "image/jpeg",
        "image/jpg",
        "image/svg+xml",
        "image/gif",
    ]
    .includes(file.type), { message: "Format d'image incorrect" })
    .refine((file) => file.size <= 5 * 1024 * 1024, { message: "La taille d'image ne doit pas dépasser 5MB" })

export const changeAvatarAction = async (formData: FormData) => {
    // shield
    const session = await getSession()
    // end shield

    const result = uploadAvatarSchema.safeParse(formData.get('userAvatar'))

    if (!result.success) return {}
    // todoreturn
    const file = result.data

    const timestamp = Date.now()
    const fileName = `${timestamp}-${file.name}`
    const filePath = path.join(process.cwd(), '/public/images', fileName)

    const avatarUrl = `/images/${fileName}`
    const fileBuffer = Buffer.from(await file.arrayBuffer())
    fs.writeFileSync(filePath, fileBuffer)

    await query('UPDATE person p SET avatar = $1 WHERE p.id = $2', [avatarUrl, session.id])

    revalidatePath('')
}

export const editBirthdayAction = async (prevState: unknown, formData: FormData) => {
    //Shield
    const session = await getSession()
    //end shield

    const result = editBirthDaySchema.safeParse({
        day: formData.get('day'),
        month: formData.get('month'),
        year: formData.get('year')
    })

    if (!result.success) return { message: "Valeurs incorrectes" }

    const {day, month, year} = result.data

    const monthNumber = (months.indexOf(month) + 1).toString()

    const fullDate = `${year}-${monthNumber}-${day}`

    await query('UPDATE person SET birthdate = $1 WHERE id = $2',
        [fullDate, session.id]
    )

    return { message: "birthday updated"}
}