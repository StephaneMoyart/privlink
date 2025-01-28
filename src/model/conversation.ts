import { model, models, Schema } from "mongoose"

const conversationSchema = new Schema ({
    members: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ],
    private: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now()
    }
})

export const Conversation = models.Conversation || model('Conversation', conversationSchema)