import { InferSchemaType, Schema, Types, model, models} from 'mongoose'

const { ObjectId } = Schema.Types

const eventSchema = new Schema({
    creator: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date
    },
    isFullDay: {
        type: Boolean,
        required: true
    },
    participants: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]
})

export type Event = InferSchemaType<typeof eventSchema> & {
    _id: Types.ObjectId
}

export const Event = models.Event || model<Event>('Event', eventSchema)