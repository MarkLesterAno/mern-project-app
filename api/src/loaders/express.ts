import express from 'express';
import cors from 'cors'
import routes from '../routes';


export default async ({ app }: { app: express.Application }) => {

    app.use(cors());
    app.enable('trust proxy');

    app.use(express.json({ limit: '20mb' }));
    app.use(express.urlencoded({ limit: '20mb', extended: true }));

    app.use('/api', routes())

}

