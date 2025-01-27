'use server'

import connectDB from "@/db/db"
import { hashPass } from "@/lib/hasspass"
import { User } from "@/model"
import { z } from "zod"

const signUpSchema = z.object({
    firstname: z.string().min(2),
    lastname: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(8).max(32),
    confirmPassword: z.string().min(8).max(32)
})

export const signUpAction = async (prev: unknown, formData: FormData) => {
    const result = signUpSchema.safeParse({
        firstname : formData.get('firstname'),
        lastname: formData.get('lastname'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirmPassword: formData.get('confirmPassword')
    })

    if (!result.success) return { }

    const { firstname, lastname, email, password, confirmPassword } = result.data

    if (password !== confirmPassword) return { success: false, firstname, lastname, email }

    const hashedPassword = await hashPass(password)

    await connectDB()

    await User.create({
        firstname,
        lastname,
        email,
        password: hashedPassword
    })

    return { success: true }
}