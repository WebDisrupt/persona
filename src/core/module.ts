import { moduleOptions } from '../models/module';
import { generic } from '../helpers/generic';
import { defaults } from '../config';

export class BaseModule {

    protected moduleData: string = defaults.system;
    protected path: string = null;
    protected appName: string = null;
    protected personaId: string = null;
    protected key: string = null;

    /**
     * Constructor - Used to assign core data
     * @param options 
     */
    public constructor(options:moduleOptions = null){
        this.path = options.path;
        this.appName = options.appName;
        this.personaId = options.personaId;
        this.key = options.key;
    }

    /**
     *  Gets the full list of cache items saved
     */
    public async getAllCache() : Promise<Array<{key: string, value: string}>> {
        try{ 
            return JSON.parse(await generic.fileLoad(`${this.path}\\${defaults.cache}`)); 
        } 
        catch { 
            return null 
        }
    }

    /**
     * Get a specified cache value
     * @param key
     * @returns name value pair or null if not found
     */
    protected async getCache(key: string = null){
        let cachList : Array<{key: string, value: string}> = await this.getAllCache();
        if (cachList != null){
            return cachList.find(item => item.key === this.uKey(key));
        } else {
            return null;
        }
    }

    /**
     * Set Cache saves a new name value pair into a cache file located by system defaults. 
     * Only should be used for storing non-critical / non-encrypted data to increase performance or add logging.
     * @param key 
     * @param value 
     * @returns true or error
     */
    protected async setCache(key: string, value : string){
        let cachList : Array<{key: string, value: string}> = await this.getAllCache();
        let entryIndex : number =  cachList ? cachList.findIndex(item => item.key === this.uKey(key)) : -1;
        if(cachList != null){
            if(entryIndex === -1){
                cachList.push({"key": this.uKey(key), "value": value}) 
            } else {
                cachList[entryIndex] = {"key": this.uKey(key), "value": value};
            }
            return await generic.fileUpdate(this.path, `${defaults.cache}`, JSON.stringify(cachList));
        } else {
            return await generic.fileUpdate(this.path, `${defaults.cache}`, JSON.stringify([{"key": this.uKey(key), "value": value}]));
        }
    }

    /**
     * Add the personaId to make the key unique per user
     * @param key 
     * @returns 
     */
    private uKey(key:string){
       return `${this.personaId}:${key}`;
    }

}