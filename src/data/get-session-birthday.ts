import 'server-only'

import { getSession } from "@/auth/session"
import { query } from '@/db/db'
import { months } from '@/lib/consts'

export const getSessionBirthday = async () => {
    const session = await getSession()

    const birthday = await query(`
        SELECT p.birthdate
        FROM person p
        WHERE id = $1
    `, [session.id])

    const result = birthday[0].birthdate

    if (result !== null) {
        const day = result.getDate()
        const month = result.getMonth()
        const monthString = months[month]
        const year = result.getFullYear()

        return `${day} ${monthString} ${year}`
    }

    return null
}