import { Schema, model, models } from 'mongoose'

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
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
})

export const User = models.User || model('User', userSchema)