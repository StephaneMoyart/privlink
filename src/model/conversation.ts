import { InferSchemaType, Model, model, models, Schema, Types } from "mongoose"

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
                ref: 'User',
                required: true
            },
            date: {
                type: Date,
                required: true
            }
        }
    ]
})

type Conversation = InferSchemaType<typeof conversationSchema> & {
    _id: Types.ObjectId
}

export type FlattenedConversation = Omit<Conversation, '_id' | 'members' | 'messages' | 'lastAuthor' | 'lastSeen'> & {
    _id: string,
    members: string[]
    messages: {
        _id: string
        author: string
        content: string
        date: Date
    }[],
    lastAuthor: string | null,
    lastSeen: {
        _id: string
        member: string
        date: Date
    }[]
}

export const Conversation: Model<Conversation> = models.Conversation || model<Conversation>('Conversation', conversationSchema)