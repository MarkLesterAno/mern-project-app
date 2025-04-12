import express from 'express'
import expressLoader from './express'
import Logger from './logger'
import mongooseLoader from './mongoose'
import dependencyInjector from './injector'
import seedLoader from './seeder'


export default async ({ app }: { app: express.Application }) => {

    const mongoConnection = await mongooseLoader();
    Logger.info('✅ Database is connected.');

    //Models
    const userModel = {
        name: "userModel",
        model: require("../shared/models/user.model").default,
    };
    const permissionModel = {
        name: "permissionModel",
        model: require("../shared/models/permission.model").default,
    };
    const groupModel = {
        name: "groupModel",
        model: require("../shared/models/group.model").default,
    };
    
    //Services

    await dependencyInjector({
        mongoConnection,
        models: [
            userModel,
            permissionModel,
            groupModel,
        ],
        services: [

        ],
    })

    await expressLoader({ app: app });
    Logger.info('✅ Express is loaded.');

    await seedLoader(mongoConnection);

}