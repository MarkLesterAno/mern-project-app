const fs = require('fs')
const path = require('path')
import config from "../../config"

export default class EmailUtils {

    /**
     * @param template 
     * @param fields 
     */

    static __render({ type, payload }: any) {
        const path = './src/shared/templates/email/'
        let fields: any
        let template: any
        let attachments: any
        let mail_options: any

        switch (type) {
            case 'reset-password':
                fields = {
                    greetings: 'Hello',
                    message_1: `We have sent you this email in response to your request to reset your password on ${config.APP_NAME}.`,
                    message_2: "To reset your password, please click the button and follow the instructions:",
                    message_3: "Or copy the link bellow:",
                    link: `${config.FE_BASEURL + 'auth/reset/' + payload.token}`,
                    button:`<span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Reset Password</span></span>`,
                    sender: 'Technical Team',
                    company: 'Test'
                }
                template = this.__template(`${path}`, fields)
                attachments = this.__assets(`${path}images`)
                mail_options = {
                    to: payload.email,
                    subject: 'Reset Password',
                    html: template,
                    attachments
                }
                break;
            case 'sign-up':
                fields = {
                    greetings: 'Hello',
                    message_1: `You have been invited to join ${config.APP_NAME}.`,
                    message_2: "To complete your registration, please click the button and follow the instructions:",
                    message_3: "Or copy the link below:",
                    link: `${config.FE_BASEURL + 'auth/signup/' + payload.token}`,
                    button:`<span style="display:block;padding:15px 40px;line-height:120%;"><span style="font-size: 18px; line-height: 21.6px;">Sign Up</span></span>`,
                    sender: 'Technical Team',
                    company: 'Test'
                }
                template = this.__template(`${path}`, fields)
                attachments = this.__assets(`${path}images`)
                mail_options = {
                    to: payload.email,
                    subject: 'Invitation to Join',
                    html: template,
                    attachments
                }
                break;
            default:
                break;
        }
        return { mail_options }
    }

    static __template(path: string, fields: any) {

        let template = fs.readFileSync(path + 'index.html', 'utf8');

        // Replace placeholders with dynamic content
        for (let key in fields) {
            template = template.replace(new RegExp('{{' + key + '}}', 'g'), fields[key]);
        }

        // let attachments = this.assets(path + 'images')
        return template
    }

    static __assets(directory: any) {
        const attachments = [];

        try {
            // Read the directory synchronously
            const directoryContents = fs.readdirSync(directory);

            // Iterate over each file in the directory
            for (let filename of directoryContents) {
                const filePath = path.join(directory, filename);

                // Check if it's a file
                if (fs.statSync(filePath).isFile()) {
                    // Generate a unique CID for the file
                    const cid: any = `file_${filename}`;

                    // Push the file as an attachment with the CID
                    attachments.push({
                        filename: filename,
                        path: filePath,
                        cid: cid
                    });
                }
            }
        } catch (error) {
            throw error
        }
        return attachments;
    }


}