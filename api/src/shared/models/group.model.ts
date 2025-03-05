import mongoose, { Schema, Document } from "mongoose";
import IGroup from "../interfaces/IGroup";
const Group: Schema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        permissions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Permission',
        }],
    },
    {
        timestamps: true,
    }
);

Group.methods.toJSON = function () {
    var obj = this.toObject();
    return obj;
};

export default mongoose.model<IGroup & mongoose.Document>("Group", Group);
