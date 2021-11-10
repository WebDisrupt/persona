
import { defaults } from '../config';
import { response } from '../helpers/response';
import { moduleOptions } from '../models/module';
import { BaseStorageBlock } from '../core/storage-block-core';
var fs = require("fs");

export class StorageBlock extends BaseStorageBlock {

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
    public exists(storageBlockId : string) : boolean{
        return super.exists(storageBlockId);
    }

    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns 
     */
    public async load(storageBlockId : string){
        return super.load(storageBlockId);
    }
        
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    public async loadAll(objectMap : any = null){
        let newObjectMap : any = {};
        let dataIdMap : Array<string> = Object.keys(objectMap);
        for(let index in dataIdMap){
            let property : string = dataIdMap[index];
            try{
                let item = await this.load(property);
                if(item?.status === true){
                    try{
                        newObjectMap[property] = JSON.parse(item.data);
                    } catch(err){
                        newObjectMap[property] = item.data;
                    }
                } else {
                    newObjectMap[property] = objectMap[property];
                }
            } catch(err){
                newObjectMap[property] = objectMap[property];
            }
        }
        return response.success(`Data storage blocks loaded successfully.`, newObjectMap);
    }
    
    /**
     * Saves a block of data to an existing block or creates a new block.
     * @param storageBlockId - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns 
     */
    public async save(storageBlockId: string, content:any){
        return super.save(storageBlockId, content);
    }

    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    public async delete(storageBlockId : string = null) {
        return super.delete(storageBlockId);
    }

    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns A list with name and path properties of all storageblocks.
    */
    public async getList() {
        if(this.personaId === null) return response.failed(`Can't list storage blocks, please login.`, []); 
        let newLinkList : Array<any> = [];
        let files : Array<string> = await fs.promises.readdir(this.path+"\\"+this.personaId);
        try{
            files.forEach( file => {
                if(file.includes(`${defaults.blockExt}`)){
                    newLinkList.push({name: file, path: this.path+"\\"+this.personaId+"\\"+file });
                }
            });
            return response.success(`All storage blocks were found.`, newLinkList);
        } catch {
            return response.failed(`Failed getting current list of files.`, []);
        }
    }    


}