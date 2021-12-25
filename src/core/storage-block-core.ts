
import { generic } from '../helpers/generic';
import { cypher } from '../helpers/cypher';
import { defaults } from '../config';
import { response } from '../helpers/response';
import { BaseModule } from '../core/module';
import { moduleOptions } from '../models/module';
var fs = require("fs");

export class BaseStorageBlock extends BaseModule {


    /**
     * Constructor - Used to assign personaOptions.
     * @param options 
     */
     public constructor(options:moduleOptions = null){
        super(options);
    }

    
    /**
     * Check if storage block exists
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns {boolean}
     */
    protected exists(storageBlockId : string) : boolean{
        return fs.existsSync(`${this.path}\\${this.personaId}\\${this.appName}.${storageBlockId}${defaults.blockExt}`) ? true : false;
    }


    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns 
     */
    protected async load(storageBlockId : string){
        let filename = `${this.appName}.${storageBlockId}${defaults.blockExt}`;
        if(this.exists(storageBlockId)){
            return await generic.fileLoad(`${this.path}\\${this.personaId}\\${filename}`).then( async (content : any) => {
                return response.success(`Data storage block ${storageBlockId} was loaded successfully.`, cypher.decrypt(content.toString(), this.key));
            });
        } else {
            return response.failed(`Data storage block ${storageBlockId} doesn't exist.`, `${this.path}\\${this.personaId}\\${filename}`);
        }
    }

      /**
     * Saves a block of data to an existing block or creates a new block.
     * @param storageBlockId - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns 
     */
    protected async save(storageBlockId: string, content:any){
        if(typeof content !== "string") content = JSON.stringify(content);
        let filename = `${this.appName}.${storageBlockId}${defaults.blockExt}`;
        if(this.personaId === null) return response.failed("No profile loaded.");
        if(storageBlockId === undefined || storageBlockId === null) return response.failed("No storage id provided.");
        let newRes = this.exists(storageBlockId) ? await this.update(filename, content) : await this.create(filename, content);
        if(newRes.status === true){
            return response.success(`Data storage block ${filename} was saved successfully.`);
        } else {
            return newRes;
        }
    }

    /**
     * Creates a new storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    protected async create(filename: string, content:string){ 
        try {
            let personaLocation = `${this.path}\\${this.personaId}`;
            await generic.fileUpdate(personaLocation, `${filename}`, cypher.encrypt(content, this.key));
            return response.success(`Data storage block successfully created.`);
        } catch (err) {
            return response.failed(`Data storage block ${filename} failed to create successfully.`);
        }
    }

    /**
     * Updates an existing Storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    protected async update(filename: string, content:string){
        try {
            await generic.fileUpdate(`${this.path}\\${this.personaId}`, `${filename}`, cypher.encrypt(content, this.key));
            return response.success(`Data storage block ${filename} successfully updated.`);
        } catch (err) {
            return response.failed(`Data storage block ${filename} failed to update successfully.`);
        }
    }
    
    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    protected async delete(storageBlockId : string = null) {
        let filename = `${this.appName}.${storageBlockId}${defaults.blockExt}`;
        if(this.personaId !== null){
            if(storageBlockId === null){
                let files : Array<string> = await fs.promises.readdir(this.path+"\\"+this.personaId);
                try{
                    files.forEach( file => {
                        if(file !== `${defaults.root}`){
                            fs.unlinkSync(this.path+"\\"+this.personaId+"\\"+file);
                        }
                    });
                    return response.success(`Successfully deleted all storage blocks.`);
                } catch {
                    return response.failed(`Could not find any storage blocks to delete.`);
                }
            } else {
                try {
                    fs.unlinkSync(this.path+"\\"+this.personaId+"\\"+filename);
                    return response.success(`Successfully deleted data storage block.[${filename}]`);
            } catch (err) {
                    return response.failed(`Failed to find the data storage block.[${filename}]`);
                }
            }
        } else {
            return response.failed(`Failed to delete data storage block(s) because no Persona was found.`);
        }
    }

}