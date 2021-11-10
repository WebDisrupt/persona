import { moduleOptions } from '../models/module';
import { BaseStorageBlock } from '../core/storage-block-core';
export declare class StorageBlock extends BaseStorageBlock {
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    constructor(options?: moduleOptions);
    /**
     * Check if storage block exists
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns {boolean}
     */
    exists(storageBlockId: string): boolean;
    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns
     */
    load(storageBlockId: string): Promise<import("../models/response").Response>;
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    loadAll(objectMap?: any): Promise<import("../models/response").Response>;
    /**
     * Saves a block of data to an existing block or creates a new block.
     * @param storageBlockId - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns
     */
    save(storageBlockId: string, content: any): Promise<import("../models/response").Response>;
    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    delete(storageBlockId?: string): Promise<import("../models/response").Response>;
    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns A list with name and path properties of all storageblocks.
    */
    getList(): Promise<import("../models/response").Response>;
}
