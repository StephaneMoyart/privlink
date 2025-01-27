'use server'

import { createSession } from "@/auth/session"
import connectDB from "@/db/db"
import { User } from "@/model"
import bcrypt from 'bcryptjs'
import { redirect } from "next/navigation"
import { z } from "zod"

const signInSchema = z.object ({
    email: z.string().email({ message: "Format d'email incorrect"}),
    password: z.string().min(8, { message: "Minimum 8 caractères"}).max(32, {message: "Maximum 32 caractères"})
})

export const signInAction = async (previousState: unknown, formData: FormData) => {
    const result = signInSchema.safeParse({
        email: formData.get('email'),
        password: formData.get('password')
    })

    if (!result.success) return { errors: result.error.flatten().fieldErrors }

    const { email, password } = result.data

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) return { message : "Email ou mot de passe incorrect"}

    const isValid = await bcrypt.compare(password, user.password)
    if (!isValid) return { message: "Email ou mot de passe incorrect" }

    await createSession(user._id)

    redirect('/dashboard')
}
