'use server'

import { getSession } from "@/auth/session"
import { UserBase } from "@/data/get-events"
import { query } from "@/db/db"

export const getUserByQueryAction = async (q: string, contacts: UserBase[]) => {
    // shield
    const session = await getSession()
    // end shield

    const keywords = q.split(" ").filter(keyword => keyword.trim().length > 0)

    const conditions = keywords.map((_, index) => { return `(firstname ILIKE $${index + 1} OR lastname ILIKE $${index + 1})`}).join(' OR ')
    const params = keywords.map(keyword => `%${keyword}%`)

    const users: UserBase[] = await query(`SELECT id, firstname, lastname, avatar FROM person WHERE ${conditions}`, params)
    return users.filter(user => (user.id !== session.id) && contacts.every(contact => user.id !== contact.id))

}

export const sendContactInvitationAction = async (invitedUserId: string) => {
    // shield
    const session = await getSession()
    // end shield

    if (session.id === invitedUserId) return { message: "Opération impossible"}

    const isExisting = await query(
        'SELECT * FROM contact_invitation WHERE invited_by_id = $1 AND invited_person_id = $2',
        [session.id, invitedUserId]
    )
    if (isExisting.length > 0) return { message: "Une invitation est déjà en cours." }

    await query(
        'INSERT INTO contact_invitation (invited_by_id, invited_person_id) VALUES ($1, $2)',
        [session.id, invitedUserId]
    )

    // todoreturn
    return {}
}