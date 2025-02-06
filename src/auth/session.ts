import "server-only"
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { decrypt } from "./decrypt"
import { User } from "@/model"
import connectDB from "@/db/db"
import { redirect } from "next/navigation"

type SessionPayload = {
    userId: string
    expiresAt: Date
}

type UserSession = {
    _id: string
    firstname: string
    lastname: string
    avatarUrl: string
    contacts: string[]
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

    await connectDB()

    const user = await User.findById(userId)
    if (!user) { throw new Error("User not found") }

    const session: UserSession = {
        _id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        avatarUrl: user.avatarUrl,
        contacts: user.contacts
    }

    return session
}

export async function deleteSession() {
    const cookieStore = await cookies()
    cookieStore.delete("session")
}