'use server'

import { query } from "@/db/db"
import { hashPass } from "@/lib/hasspass"
import { z } from "zod"

const signUpSchema = z.object({
    firstname: z.string().min(2, { message: "Minimum 2 caractères" }),
    lastname: z.string().min(2, { message: "Minimum 2 caractères" }),
    email: z.string().email({ message: "Format d'email incorrect"}),
    password: z.string().min(8, { message: "Minimum 8 caractères"}).max(32, {message: "Maximum 32 caractères"}),
    confirmPassword: z.string().min(8, { message: "Minimum 8 caractères"}).max(32, {message: "Maximum 32 caractères"})
})

export const signUpAction = async (prev: unknown, formData: FormData) => {
    const result = signUpSchema.safeParse({
        firstname : formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!result.success) return { errors: result.error.flatten().fieldErrors }

    const { firstname, lastname, email, password, confirmPassword } = result.data

    if (password !== confirmPassword) return { success: false, firstname, lastname, email }

    const hashedPassword = await hashPass(password)

    await query('INSERT INTO person (firstname, lastname, email, password) VALUES ($1, $2, $3, $4)', [firstname, lastname, email, hashedPassword])

    return { success: true }
}