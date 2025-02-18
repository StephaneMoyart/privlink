'use server'

import path from "path"
import fs from 'fs'
import { revalidatePath } from "next/cache"
import { z } from "zod"
import { getSession } from "@/auth/session"
import { query } from "@/db/db"

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