// import { Model, model, models, Schema, Types } from "mongoose";

// const { ObjectId } = Schema.Types

// const eventInvitationSchema = new Schema ({
//     event: {
//         type: ObjectId,
//         ref: 'Event',
//         required: true
//     },
//     invitedBy: {
//         type: ObjectId,
//         ref: 'User',
//         required: true
//     },
//     invitedUsers: [
//         {
//             type: ObjectId,
//             ref: 'User',
//             required: true
//         }
//     ],

// }, { timestamps: true })

// export type EventInvitationT = {
//     _id: Types.ObjectId
//     event: Types.ObjectId
//     invitedBy: Types.ObjectId
//     invitedUsers: Types.Array<Types.ObjectId>
// }

// export const EventInvitation: Model<EventInvitationT> = models.EventInvitation || model<EventInvitationT>('EventInvitation', eventInvitationSchema)