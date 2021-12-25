import { moduleOptions } from '../models/module';
export declare class BaseModule {
    protected moduleData: string;
    protected path: string;
    protected appName: string;
    protected personaId: string;
    protected key: string;
    /**
     * Constructor - Used to assign core data
     * @param options
     */
    constructor(options?: moduleOptions);
    /**
     *  Gets the full list of cache items saved
     */
    getAllCache(): Promise<Array<{
        key: string;
        value: string;
    }>>;
    /**
     * Get a specified cache value
     * @param key
     * @returns name value pair or null if not found
     */
    protected getCache(key?: string): Promise<{
        key: string;
        value: string;
    }>;
    /**
     * Set Cache saves a new name value pair into a cache file located by system defaults.
     * Only should be used for storing non-critical / non-encrypted data to increase performance or add logging.
     * @param key
     * @param value
     * @returns true or error
     */
    protected setCache(key: string, value: string): Promise<any>;
    /**
     * Add the personaId to make the key unique per user
     * @param key
     * @returns
     */
    private uKey;
}
