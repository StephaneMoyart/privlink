'use server'

import { getSession } from "@/auth/session"
import { pool, query } from "@/db/db"
import { revalidatePath } from "next/cache"

export const getContactInvitations = async () => {
    // shield
    const session = await getSession()
    // end shield

    return await query(
        'SELECT p.id AS invited_by_id, p.firstname, p.lastname, p.avatar, ci.id AS id FROM person p JOIN contact_invitation ci ON p.id = ci.invited_by_id WHERE invited_person_id = $1',
        [session.id]
    )
}

export const acceptContactInvitationAction = async (invitedByUserId: string, invitationId: string): Promise<void> => {
    // shield
    const session = await getSession()
    // end shield

    // if (session.contacts.includes(new Types.ObjectId(invitedByUserId))) {
    //     await ContactInvitation.deleteOne({ _id: invitationId})
    //     return
    // }
    const client = await pool.connect()
    try {
        await client.query('BEGIN')
        await client.query('INSERT INTO contact (person1_id, person2_id) VALUES ($1, $2)', [session.id, invitedByUserId])
        const createdConversation = await client.query('INSERT INTO conversation DEFAULT VALUES RETURNING id')
        await client.query('INSERT INTO conversation_member (conversation_id, member_id) VALUES ($1, $2), ($1, $3)', [createdConversation.rows[0].id, session.id, invitedByUserId])
        await client.query('INSERT INTO conversation_last_seen (conversation_id, member_id) VALUES ($1, $2), ($1, $3)', [createdConversation.rows[0].id, session.id, invitedByUserId])
        await client.query('DELETE FROM contact_invitation ci WHERE ci.id = $1', [invitationId])
        await client.query ('COMMIT')
    } catch (err) {
        await client.query('ROLLBACK')
        throw err
    } finally {
        client.release()
    }

    revalidatePath('')
}

export const declineContactInvitationAction = async (invitationId: string) => {
    // shield
    await getSession()
    // end shield

    await query('DELETE FROM contact_invitation ci WHERE ci.id = $1', [invitationId])

    revalidatePath('')
    // todo
}