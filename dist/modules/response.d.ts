import { Response } from '../models/response';
export declare class response {
    /**
     * A successful response
     * @param message - Detailed message relevant to the status
     * @param data - (optional) used for passing back data can be string or object
     * @returns [status, message, data]
     */
    static success(message: string, data?: any): Response;
    /**
     * A failure response
     * @param message - Detailed message relevant to the status
     * @returns [status, message]
     */
    static failed(message: string, data?: any): Response;
}
