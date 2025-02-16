// import { Model, model, models, Schema, Types } from "mongoose"

// const { ObjectId } = Schema.Types

// const contactInvitationSchema = new Schema ({
//     invitedUser: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     },
//     invitedByUser: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     }
// }, { timestamps: true })

// export type ContactInvitationT = {
//     _id: Types.ObjectId
//     invitedUser: Types.ObjectId
//     invitedByUser: Types.ObjectId
//     createdAt: Date
// }

// export const ContactInvitation: Model<ContactInvitationT> = models.ContactInvitation || model<ContactInvitationT>('ContactInvitation', contactInvitationSchema)