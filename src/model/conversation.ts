import { InferSchemaType, model, models, Schema, Types } from "mongoose"

const { ObjectId } = Schema.Types

const conversationSchema = new Schema ({
    members: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            author: {
                type: ObjectId,
                ref: 'User',
                required: true
            },
            content: {
                type: String,
                required: true
            },
            date: {
                type: Date,
                default: Date.now
            }
        }
    ],
    multi: {
        type: Boolean,
        default: false
    },
    title: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    lastUpdate: {
        type: Date,
        default: Date.now
    },
    lastAuthor: {
        type: ObjectId,
        ref: 'User',
        default: null
    },
    lastSeen: [
        {
            member: {
                type: ObjectId,
                ref: 'User'
            },
            date: {
                type: Date
            }
        }
    ]
})

export type Conversation = InferSchemaType<typeof conversationSchema> & {
    _id: Types.ObjectId
}

export const Conversation = models.Conversation || model<Conversation>('Conversation', conversationSchema)