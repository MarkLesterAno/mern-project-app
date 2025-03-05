
export default class ErrorHelper {
    static formatError(message: any, statusCode: number) {
        const error = {
            message,
            statusCode,
        }
        return error;
    }
}