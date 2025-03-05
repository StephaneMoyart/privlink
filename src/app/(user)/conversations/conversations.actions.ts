'use server'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"

export const updateLastSeenAction = async (conversationId: string) => {
  //sield
  const session = await getSession()
  //end shield

  await query(`
    INSERT INTO conversation_last_seen (conversation_id, member_id)
    VALUES ($1, $2)
    ON CONFLICT (conversation_id, member_id)
    DO UPDATE SET date = DEFAULT
  `, [conversationId, session.id])
}