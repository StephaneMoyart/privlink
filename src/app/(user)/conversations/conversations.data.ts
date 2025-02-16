import 'server-only'

import { getSession } from "@/auth/session"
import { query } from '@/db/db'

export const getSessionConversations = async () => {
    // shield
    const session = await getSession()
    // end shield

    const conversations = await query(
        'SELECT c.*, JSON_AGG(JSON_BUILD_OBJECT(\'id\', p.id, \'firstname\', p.firstname, \'lastname\', p.lastname, \'avatarUrl\', p.avatar)) AS members FROM conversation AS c JOIN conversation_member AS cm ON c.id = cm.conversation_id JOIN person AS p ON p.id = cm.member_id WHERE c.id IN (SELECT conversation_id FROM conversation_member WHERE member_id = $1) GROUP BY c.id, c.title, c.created_at, c.updated_at, c.last_author',
        [session.id]
    )
    console.log(conversations)

    return conversations
    // return (await Conversation.find({
    //     members: { $in : [session._id]}
    //     })
    //     .populate<Pick<SelectedPopulatedFlatConversation, 'members'>>('members', '_id firstname lastname avatarUrl')
    //     .sort({lastUpdate: - 1})
    //     .select('_id multi title members lastUpdate lastAuthor'))
    //     .map(conversation => ({...conversation, members: conversation.members.filter(member => member._id !== session._id.toString())}))
}