const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:5000', { timeout: 5000 });

ws.addEventListener('open', () => {
    ws.send('Hello, world!');
})
ws.addEventListener('message', (event) => {
    console.log('Message from server ', event.data);
})