import mongoose from "mongoose";
import config from "../config";

export default async (): Promise<any> => {
    mongoose.set('strictQuery', true);
    const db = await mongoose.connect(config.DATABSE_URL, {
        directConnection: true,
        serverSelectionTimeoutMS: 2000,
        appName: 'mongosh+1.10.5'
    })
    return db.connection;
}
