// import { Model, Schema, Types, model, models } from 'mongoose'

// const { ObjectId } = Schema.Types

// const userSchema = new Schema({
//     firstname: {
//         type: String,
//         required: true
//     },
//     lastname: {
//         type: String,
//         required: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     avatarUrl: {
//         type: String,
//         default: null
//     },
//     birthDate: {
//         type: Date,
//         default: null
//     },
//     contacts: [
//         {
//             type: ObjectId,
//             ref: 'User'
//         }
//     ]
// })

// export type UserT = {
//     _id: Types.ObjectId
//     firstname: string
//     lastname: string
//     email: string
//     password: string
//     avatarUrl: string
//     birthDate: Date
//     contacts: Types.Array<Types.ObjectId>
// }

// export const User: Model<UserT> = models.User || model<UserT>('User', userSchema)