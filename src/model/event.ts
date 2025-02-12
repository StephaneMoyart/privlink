import { InferSchemaType, Model, Schema, Types, model, models} from 'mongoose'

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
        type: Date,
        default: null
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

export type Event = Omit<InferSchemaType<typeof eventSchema>, 'endDate'> & {
    _id: Types.ObjectId
    endDate: Date | null
}

export type FlattenedEvent = Omit<Event, '_id' | 'creator' | 'participants'> & {
    _id: string
    creator: string
    participants: string[]
}

export const Event: Model<Event> = models.Event || model<Event>('Event', eventSchema)