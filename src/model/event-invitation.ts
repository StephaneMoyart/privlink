import { InferSchemaType, model, models, Schema, Types } from "mongoose";

const ObjectId = Schema.Types

const eventInvitationSchema = new Schema ({
    event: {
        type: ObjectId,
        ref: 'Event',
        required: true
    },
    invitedBy: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    invitedUsers: [
        {
            type: ObjectId,
            ref: 'User',
            required: true
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export type EventInvitation = InferSchemaType<typeof eventInvitationSchema> & {
    _id: Types.ObjectId
}

export const EventInvitation = models.EventInvitation || model<EventInvitation>('EventInvitation', eventInvitationSchema)