import 'server-only'

import { getSession } from "@/auth/session"
import { query } from '@/db/db'

export type ConversationMember = {
    id: string
    firstname: string
    lastname: string
    avatar: string
}

export type Conversation = {
    id: string
    multi: boolean
    title?: string
    created_at: Date
    updated_at: Date
    last_author?: string
    members: ConversationMember[]
}

export const getSessionConversations = async () => {
    // shield
    const session = await getSession()
    // end shield

    return await query<Conversation>('SELECT c.*, JSON_AGG(JSON_BUILD_OBJECT(\'id\', p.id, \'firstname\', p.firstname, \'lastname\', p.lastname, \'avatar\', p.avatar)) AS members FROM conversation AS c JOIN conversation_member AS cm ON c.id = cm.conversation_id JOIN person AS p ON p.id = cm.member_id WHERE c.id IN (SELECT conversation_id FROM conversation_member WHERE member_id = $1) AND p.id != $1 GROUP BY c.id, c.title, c.created_at, c.updated_at, c.last_author ORDER BY c.updated_at DESC',
        [session.id]
    )
}