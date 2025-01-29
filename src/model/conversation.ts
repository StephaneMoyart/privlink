import { model, models, Schema } from "mongoose"

const conversationSchema = new Schema ({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    messages: [
        {
            author: {
                type: Schema.Types.ObjectId,
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

export const Conversation = models.Conversation || model('Conversation', conversationSchema)