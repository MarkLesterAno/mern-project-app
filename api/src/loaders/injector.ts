import { Container } from 'typedi';
import Logger from './logger';

export default async ({ mongoConnection, models, services }: { mongoConnection: any; models: { name: string; model: any }[], services: { name: string; model: any }[] }) => {
    try {

        //set the models
        models.forEach(m => {
            Container.set(m.name, m.model);
        });

        //set the services
        services.forEach(m => {
            Container.set(m.name, m.model);
        });

        Container.set('mongoConnection', mongoConnection);
        Container.set('logger', Logger)

        Logger.info('✅ Agenda injected into container');

    } catch (e) {
        Logger.error('🔥 Error on dependency injector loader: %o', e);
        throw e;
    }
};