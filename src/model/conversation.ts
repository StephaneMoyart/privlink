// import { Model, model, models, Schema, Types } from "mongoose"

// const { ObjectId } = Schema.Types

// const conversationSchema = new Schema ({
//     members: [
//         {
//             type: ObjectId,
//             ref: 'User'
//         }
//     ],
//     messages: [
//         {
//             author: {
//                 type: ObjectId,
//                 ref: 'User',
//                 required: true
//             },
//             content: {
//                 type: String,
//                 required: true
//             },
//             date: {
//                 type: Date,
//                 default: Date.now
//             }
//         }
//     ],
//     multi: {
//         type: Boolean,
//         default: false
//     },
//     title: {
//         type: String
//     },
//     lastAuthor: {
//         type: ObjectId,
//         ref: 'User',
//         default: null
//     },
//     lastSeen: [
//         {
//             member: {
//                 type: ObjectId,
//                 ref: 'User',
//                 required: true
//             },
//             date: {
//                 type: Date,
//                 required: true
//             }
//         }
//     ]
// }, { timestamps: true })

// type Message = {
//     author: Types.ObjectId
//     content: string
//     date: Date
// }

// type FlatMessage = {
//     author: string
//     content: string
//     date: Date
// }

// type LastSeenEntry = {
//     member: Types.ObjectId
//     date: Date
// }

// type FlatLastSeenEntry = {
//     member: string
//     date: Date
// }

// export type FlatConversationT = {
//     _id: string
//     members: string[]
//     messages: FlatMessage[]
//     multi: boolean
//     title: string
//     lastAuthor: Types.ObjectId | null
//     lastSeen: FlatLastSeenEntry[]
//     createdAt: Date
//     updatedAt: Date
// }

// export type ConversationT = {
//     _id: Types.ObjectId
//     members: Types.Array<Types.ObjectId>
//     messages: Types.DocumentArray<Message>
//     multi: boolean
//     title: string
//     lastAuthor: Types.ObjectId | null
//     lastSeen: Types.DocumentArray<LastSeenEntry>
//     createdAt: Date
//     updatedAt: Date
// }

// export const Conversation: Model<ConversationT> = models.Conversation || model<ConversationT>('Conversation', conversationSchema)