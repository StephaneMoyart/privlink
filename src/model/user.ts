import { InferSchemaType, Schema, model, models } from 'mongoose'

const { ObjectId } = Schema.Types

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatarUrl: {
        type: String,
        default: null
    },
    birthDate: {
        type: Date,
        default: null
    },
    contacts: [
        {
            type: ObjectId,
            ref: 'User'
        }
    ]
})

type User = InferSchemaType<typeof userSchema>

export const User = models.User || model<User>('User', userSchema)