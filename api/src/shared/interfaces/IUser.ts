import { Document } from 'mongoose';
export interface IUser extends Document {
    username: string;
    email: string;
    password: string;
    isActive: boolean;
    isStaff: boolean;
    isSuperuser: boolean;
    groups: string[];
    permissions: string[];
}