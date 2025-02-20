import "server-only"

import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { decrypt } from "./decrypt"
import { redirect } from "next/navigation"
import { query } from "@/db/db"

type SessionPayload = {
    userId: string
    expiresAt: Date
}

type Session = {
    id: string
    firstname: string
    lastname: string
    avatar: string
}

const secretKey = process.env.JWT_SECRET
const encodedKey = new TextEncoder().encode(secretKey)

export async function encrypt(payload: SessionPayload) {
    return new SignJWT(payload)
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime("7d")
        .sign(encodedKey)
}

export async function createSession(userId: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    const session = await encrypt({ userId, expiresAt })

    const cookieStore = await cookies()
    cookieStore.set({
        name: "session",
        value: session,
        httpOnly: true,
        // for localhost access
        // secure: true,
        expires: expiresAt,
    })
}

export async function getSession() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("session")

    if (!sessionCookie) return redirect('/signin')

    const payload = await decrypt(sessionCookie.value)

    if (!payload || !payload.userId) { throw new Error("Invalid session or missing userId in payload") }

    const userId = payload.userId

    const user: Session[] = await query('SELECT p.id, p.firstname, p.lastname, p.avatar FROM person p WHERE id = $1 LIMIT 1', [userId])
    if (user.length === 0) { throw new Error("User not found") }

    return {
        ...user[0]
    }
}


export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}