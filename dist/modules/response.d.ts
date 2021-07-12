export declare class response {
    static success(message: string, data?: any): {
        status: boolean;
        message: string;
        data: any;
    };
    static failed(message: string, data?: any): {
        status: boolean;
        message: string;
        data: any;
    };
}
