import { BaseModule } from '../core/module';
import { moduleOptions } from '../models/module';
export declare class BaseStorageBlock extends BaseModule {
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
    protected exists(storageBlockId: string): boolean;
    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns
     */
    protected load(storageBlockId: string): Promise<import("../models/response").Response>;
    /**
   * Saves a block of data to an existing block or creates a new block.
   * @param storageBlockId - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
   * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
   * @returns
   */
    protected save(storageBlockId: string, content: any): Promise<import("../models/response").Response>;
    /**
     * Creates a new storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    protected create(filename: string, content: string): Promise<import("../models/response").Response>;
    /**
     * Updates an existing Storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    protected update(filename: string, content: string): Promise<import("../models/response").Response>;
    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    protected delete(storageBlockId?: string): Promise<import("../models/response").Response>;
}
