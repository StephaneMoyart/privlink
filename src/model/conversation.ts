import { InferSchemaType, model, models, Schema } from "mongoose"

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
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export type Conversation = InferSchemaType<typeof conversationSchema>

export const Conversation = models.Conversation || model<Conversation>('Conversation', conversationSchema)