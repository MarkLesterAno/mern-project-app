import 'reflect-metadata';
import express from 'express';
import Logger from './loaders/logger';
import config from './config';
import loaders from './loaders';
const WS = require('ws');

const startServer = async () => {

    const all_routes = require('express-list-endpoints');

    const app: express.Application = express()
    await loaders({ app })

    const server = require('http').createServer(app);
    
    const wss = new WS.Server({ server: server });

    wss.on('connection', function connection(ws: any) {
        console.log('A new client is connected')

        ws.on('message', function message(data: any) {
            console.log('received: %s', data)
            ws.send('Hello, world!')
        })
    })

    server.listen(config.PORT, () => {
        Logger.info(`🛡️  Server listening on port: ${config.PORT} 🛡️ 
        `);
    });
}

startServer();