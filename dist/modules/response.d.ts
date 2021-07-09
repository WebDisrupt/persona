export declare class response {
    static success(message: string, data?: string): {
        status: boolean;
        message: string;
        data: string;
    };
    static failed(message: string): {
        status: boolean;
        message: string;
    };
}
