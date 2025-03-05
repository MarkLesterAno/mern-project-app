import { Container } from 'typedi';
import SeederService from '../shared/seeders/seeder.service';
import logger from './logger';
import mongoose from 'mongoose';

const seeder = async (connection: mongoose.Connection) => {
    const seederService = Container.get(SeederService)

    const seeders = [
        { name: "Users", cb: seederService.seedUser },
        { name: "Permissions", cb: seederService.seedPermission },
        { name: "Groups", cb: seederService.seedGroup },
    ]
    return seeders.map((seeder) => ({ ...seeder, cb: () => seeder.cb(connection) }))
}

export default async (mongoConnection: mongoose.Connection) => {
    try {

        const seeders = await seeder(mongoConnection)
        const names = seeders.map(({ name }) => name)

        for (const seeder of seeders) {
            await seeder.cb()
        }

        logger.info("Seeders Loaded: \n\t ✅ " + names.join("\n\t ✅ "))

    } catch (error: any) {
        logger.error(error?.message)
    }
}

