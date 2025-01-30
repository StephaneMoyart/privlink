import { InferSchemaType, model, models, Schema } from "mongoose"

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
        default: Date.now
    }
})

type ContactInvitation = InferSchemaType<typeof contactInvitationSchema>

export const ContactInvitation = models.ContactInvitation || model<ContactInvitation>('ContactInvitation', contactInvitationSchema)