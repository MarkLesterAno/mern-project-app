import mongoose, { Schema, Document } from "mongoose";
import IPermission from "../interfaces/IPermission";
const Permission: Schema = new Schema(
    {
        resource: {
            type: String,
            required: true,
        },
        action: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

Permission.methods.toJSON = function () {
    var obj = this.toObject();
    return obj;
};

export default mongoose.model<IPermission & mongoose.Document>("Permission", Permission);
