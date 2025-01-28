import { getSessionOrRedirect } from "@/auth/get-session-or-redirect"
import connectDB from "@/db/db"
import { ContactInvitation } from "@/model"

export const getContactInvitations = async () => {
    // shield
    const session = await getSessionOrRedirect()
    // end shield

    await connectDB()

    const invitations = ContactInvitation
        .find({ invitedUser : session._id })
        .populate('invitedByUser', 'firstname lastname avatarUrl')

    return invitations
}