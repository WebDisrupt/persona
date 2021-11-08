import { Response } from '../models/response';
// Standard response objects used when returning details to user
export class response {

    /**
     * A successful response
     * @param message - Detailed message relevant to the status
     * @param data - (optional) used for passing back data can be string or object
     * @returns [status, message, data]
     */
    public static success( message: string, data: any = null) : Response {
        return { status: true, message: message, data: data };
    }

    /**
     * A failure response
     * @param message - Detailed message relevant to the status
     * @returns [status, message]
     */
    public static failed( message: string, data: any = null ) : Response {
        return { status: false, message: message, data:data };
    }

}