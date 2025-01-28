import { model, models, Schema } from "mongoose"

const contactInvitationSchema = new Schema ({
    invitedUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    invitedByUser: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

export const ContactInvitation = models.ContactInvitation || model('ContactInvitation', contactInvitationSchema)