import { getSession } from "@/auth/session"
import { EventInvitation } from "@/model"

const Page = async () => {
    const session = await getSession()
    const invitations = await EventInvitation
        .find({invitedUsers: {$in: [session._id]}})
        .populate('event', 'title')
        .populate('invitedBy', 'firstname lastname')

    console.log(invitations);


    return (
        <>
            {invitations.map(invitation => (
                <div key={invitation._id}>
                    <p>{invitation.invitedBy.firstname} {invitation.invitedBy.lastname} vous invite à rejoindre l&apos;évenement {invitation.event.title}</p>
                </div>
            ))}
        </>
    )
}

export default Page