import { Client, ClientChannel, ConnectConfig } from 'ssh2';
import config from '../../config';

export default class DeviceUtils
{

    static SSHService(command: any) {
        const conf: ConnectConfig = {
            host: config.device_host,
            port: config.device_port,
            username: config.device_user,
            password: config.device_password
        };

        return new Promise((resolve, reject) => {
            const conn = new Client();
            conn.on('ready', () => {
                conn.exec(command, (err: any, stream: ClientChannel) => {
                    if (err) {
                        reject(err);
                        return;
                    }

                    let output = '';
                    stream.on('data', (data: Buffer) => {
                        output += data.toString()
                    });

                    stream.on('close', (code: number, signal: string) => {
                        conn.end();
                        resolve(output);
                    });
                });
            });

            conn.on('error', (err: Error) => {
                reject(err);
            });

            conn.connect(conf);

        })
    }


    static async deviceConsole(command: any) {
        const cmd = `:put [${command} print as-value detail]`
        const rs: any = await DeviceUtils.SSHService(cmd)

        const data: any = {};
        const pairs = rs.split(';');

        pairs.forEach((pair: { split: (arg0: string) => [any, any]; }) => {
            const [key, value] = pair.split('=');
            data[key.trim()] = value.trim();
        });

        return data;

    }
}