export declare class cypher {
    private static ENCRYPTION_KEY;
    private static readonly debug;
    /**
     * Perpares key for use
     * @param key
     * @returns 32 character key with most important factors taking precident
     */
    private static getKey;
    /**
     * Encrypt using secure encryption process
     * @param text - String to encrypt
     * @param key - Key used to dynamically strengthen encryption
     * @returns
     */
    static encrypt(text: string, key?: string): any;
    /**
     * Decrypt using secure encryption process. If it fails then return an empty string.
     * @param text - String to decrypt
     * @param key - Key used to dynamically strengthen encryption
     * @returns
     */
    static decrypt(text: string, key?: string): any;
    /**
    * Uses Bcrypt to create a secure irreversible hash
    * @param password - User supplied password
    * @param saltRounds Optional - defines the complexity
    * @returns
    */
    static hash(password: string, strength?: number): Promise<string>;
    private static getStrength;
    /**
     * Verify with Bcrypt to check if it is correct
     * @param password - User supplied password
     * @param hash - Hash to compare against
     * @returns
     */
    static verify(password: string, hash: string): Promise<boolean>;
    /**
     * Generate random recovery code which will allow the user to unlock his acees to persona
     */
    static generateRecoveryCode(): string;
}
