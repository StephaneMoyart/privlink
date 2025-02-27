import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"
import { decrypt } from "./auth/session"

const protectedRoutes = ["/dashboard"]
const publicRoutes = ["/", '/signin', '/signup']

export default async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const isProtectedRoute = protectedRoutes.includes(path)
    const isPublicRoute = publicRoutes.includes(path)

    const cookieStore = await cookies()
    const cookie = cookieStore.get("session")?.value
    const session = cookie ? await decrypt(cookie) : null

    if (isProtectedRoute && !session?.userId) {
        return NextResponse.redirect(new URL("/signin", req.nextUrl))
    }

    if (isPublicRoute && session?.userId) {
        return NextResponse.redirect(new URL("/dashboard", req.nextUrl))
    }

    return NextResponse.next()
}

export const config = {
    runtime: 'nodejs',
}