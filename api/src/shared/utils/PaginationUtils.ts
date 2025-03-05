import { randomBytes } from 'crypto';

export default class PaginationUtils {

    /**
     * @param limit 
     * @param page 
     */

    static setPagination(limit: any, page: any) {
        let new_page = page ? parseInt(page, 10) : 1;
        let new_limit = limit ? parseInt(limit, 10) : 10;
        let datatoSkip = 0;

        if (new_page > 1) {
            datatoSkip = (new_page - 1) * new_limit;
        }
        
        return { pageSize: new_limit, skip: datatoSkip };
    }

    static generateResetToken(length: number = 32) {
        const randomBytesBuffer = randomBytes(length);
        const token = randomBytesBuffer.toString('hex');
        return token;
    }
}