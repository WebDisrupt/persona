export declare class cypher {
    private static ENCRYPTION_KEY;
    private static readonly debug;
    private static getKey;
    static encrypt(text: string, key?: string): any;
    static decrypt(text: string, key?: string): any;
    static hash(password: string, strength?: number): Promise<string>;
    private static getStrength;
    static verify(password: string, hash: string): Promise<boolean>;
    static generateRecoveryCode(): string;
}
