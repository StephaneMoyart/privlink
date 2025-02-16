// import { Model, Schema, Types, model, models} from 'mongoose'

// const { ObjectId } = Schema.Types

// const eventSchema = new Schema({
//     creator: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     },
//     title: {
//         type: String,
//         required: true
//     },
//     description: {
//         type: String
//     },
//     startDate: {
//         type: Date,
//         required: true
//     },
//     endDate: {
//         type: Date,
//         default: null
//     },
//     isFullDay: {
//         type: Boolean,
//         required: true
//     },
//     participants: [
//         {
//             type: ObjectId,
//             ref: 'User'
//         }
//     ]
// })

// export type EventT = {
//     _id: Types.ObjectId
//     creator: Types.ObjectId
//     title: string
//     description?: string
//     startDate: Date
//     endDate: Date | null
//     isFullDay: boolean
//     participants: Types.Array<Types.ObjectId>
// }

// export const Event: Model<EventT> = models.Event || model<EventT>('Event', eventSchema)