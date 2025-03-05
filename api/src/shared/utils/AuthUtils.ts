import { randomBytes } from 'crypto';
import { Client, ClientChannel, ConnectConfig } from 'ssh2';

export default class AuthUtils {

    /**
     * @param length
     */

    static generateResetToken(length: number = 32) {
        const randomBytesBuffer = randomBytes(length);
        const token = randomBytesBuffer.toString('hex');
        return token;
    }

    static SSHService(command: any) {
        const sshConfig: ConnectConfig = {
            host: '10.0.29.93',
            port: 22,
            username: 'admin',
            password: 'admin'
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

            conn.connect(sshConfig);

        })
    }


    static async deviceConsole(command: any) {
        const rs: any = await AuthUtils.SSHService(command)
        const replacedString = rs.replace(/;\./g, " .");
        const items: any = []

        replacedString.split(" ").forEach((element: string) => {
            const item: any = {}
            element.split(';').forEach((field: string) => {
                const [key, value] = field.split("=");
                item[key] = !value.includes("\r\n") ? value : value.trim()
            })
            items.push(JSON.parse(JSON.stringify(item)))
        });

        return items;

    }
}