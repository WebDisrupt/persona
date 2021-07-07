
// Standard response objects used when returning details to user
export class response {

    /**
     * A successful response
     * @param message - Detailed message relevant to the status
     * @param data - (optional) used for passing back data
     * @returns [status, message, data]
     */
    public static success( message: string, data: string = null){
        return { status: true, message: message, data: data };
    }

    /**
     * A failure response
     * @param message - Detailed message relevant to the status
     * @returns [status, message]
     */
    public static failed( message: string ){
        return { status: false, message: message };
    }

}