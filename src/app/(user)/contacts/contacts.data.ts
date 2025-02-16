import { getSession } from '@/auth/session'
import { query } from '@/db/db'
import 'server-only'

export const getContacts = async () => {
    const session = await getSession()

    return await query('SELECT p.id, p.firstname, p.lastname, p.avatar FROM person p JOIN contact c ON p.id = c.person1_id OR p.id = c.person2_id WHERE c.person1_id = $1 OR c.person2_id = $1',
        [session.id]
    )
}

// const contacts: Contact[] = (await User.find({ _id: { $in: session.contacts }}, ('firstname lastname avatarUrl'))).map(contact => contact.toJSON({ flattenObjectIds: true }))