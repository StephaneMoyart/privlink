import { InferSchemaType, Model, model, models, Schema, Types } from "mongoose"

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

type ContactInvitation = InferSchemaType<typeof contactInvitationSchema> & {
    _id: Types.ObjectId
}

export type FlattenedContactInvitation = {
    _id: string
    invitedUser: string
    invitedByUser: string
    createdAt: NativeDate
}

export const ContactInvitation: Model<ContactInvitation> = models.ContactInvitation || model<ContactInvitation>('ContactInvitation', contactInvitationSchema)