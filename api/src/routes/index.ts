import { Router } from 'express'
import cors from 'cors'
import api from './api'

export default () => {
    const app = Router()
    app.use(cors())

    app.use('/', api())

    app.get('/test', (req, res) => {
        res.send('Hello World')
    });

    app.all('*', (req, res) => {
        res.status(404).send('<h1>404! Page not found</h1>');
    });
    return app;
}