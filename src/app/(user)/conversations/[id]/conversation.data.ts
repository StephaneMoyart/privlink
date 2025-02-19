import 'server-only'

import { getSession } from "@/auth/session"
import { query } from "@/db/db"

export type SelectConversationMessage = {
    id: string
    content: string
    created_at: string
    author: {
        id: string
        avatar: string
        lastname: string
        firstname: string
    }
}

export type SelectedConversationMember = {
    id: string
    firstname: string
    lastname: string
}


export type SelectedConversation = {
    id: string
    title: string
    multi: boolean
    members: SelectedConversationMember[]
    messages: SelectConversationMessage[]
}

export const getSelectedConversation = async (conversationId: string) => {
    //shield
    const session = await getSession()
    //end shield
    return await query('SELECT c.id, c.title, c.multi, ARRAY(SELECT json_build_object(\'id\', cm.member_id, \'firstname\', p.firstname, \'lastname\', p.lastname) FROM conversation_member cm JOIN person p ON p.id = cm.member_id WHERE cm.conversation_id = c.id) AS members, COALESCE(jsonb_agg(jsonb_build_object(\'id\', cmess.id, \'content\', cmess.content, \'created_at\', cmess.created_at, \'author\', jsonb_build_object(\'id\', p.id, \'firstname\', p.firstname, \'lastname\', p.lastname, \'avatar\', p.avatar))) FILTER (WHERE cmess.id IS NOT NULL), \'[]\'::jsonb) AS messages FROM conversation c JOIN conversation_member cmemb ON c.id = cmemb.conversation_id AND cmemb.member_id = $1 LEFT JOIN conversation_message cmess ON c.id = cmess.conversation_id LEFT JOIN person p ON p.id = cmess.author_id WHERE c.id = $2 GROUP BY c.id',
        [session.id, conversationId]
    ) as SelectedConversation[]
}