import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../../shared/interfaces/IUser';
const User: Schema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: false,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        isActive: {
            type: Boolean,
            required: true, 
        },
        isStaff: {
            type: Boolean,
            required: true,
        },
        isSuperuser: {
            type: Boolean,
            required: true,
        },
        groups: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Group',
        }],
        permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
        }],
    },
    { timestamps: true },
);

export default mongoose.model<IUser & Document>('User', User);