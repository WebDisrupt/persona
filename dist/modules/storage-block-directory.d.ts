import { moduleOptions } from '../models/module';
import { BaseStorageBlock } from '../core/storage-block-core';
export declare class StorageBlockDirectory extends BaseStorageBlock {
    progressTracker: Array<any>;
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    constructor(options?: moduleOptions);
    /**
     * Save the entire file structure inside a directory to a storage block. Does not save empty directories
     * @param directoryPath - Directory you would like to save
     * @param storageBlockName
     */
    save(directoryPath: string, storageBlockName: string, clearDirectory?: boolean): Promise<import("../models/response").Response>;
    /**
     * Create a new directory baed on a storage block
     * @param storageBlockName - Unique Storage block
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    load(storageBlockName: string, newLocation?: string): Promise<import("../models/response").Response>;
    /**
     * Sets the directory loading progress based on storage block name.
     * @param storageBlockName - Unique Storage block
     */
    setProgress(storageBlockName: string, progress?: number): void;
    /**
     * Gets current loading progress based on the provided storage block name.
     * @param storageBlockName - Unique Storage block
     * @returns percentage out of 100 that the directory has been loaded
     */
    getProgress(storageBlockName: string): any;
    /**
     * Get storage block path based on storage block id
     * @param storageBlockName
     * @returns
     */
    getDirectoryPath(storageBlockName: string): Promise<import("../models/response").Response>;
    /**
     * Storage Block Directory - Get version from the pstore.version file inside the directory
     * @param storageBlockName - Storage block that
     * @return New version
     */
    getVersionFile(storageBlockName: string): Promise<number>;
    /**
     * Storage Block not having
     * @param storageBlockName - Storage block that
     * @param version - Set a new version, if empty increment by 1
     * @return New version
     */
    setVersionFile(storageBlockName: string, version?: number): Promise<number>;
    /**
     * Removes a directory and all files inside that directory based on storage block name.
     * @param storageBlockName - Name of the storage block
     */
    removeDirectory(storageBlockName: string): Promise<import("../models/response").Response>;
    /**
     * Checks if a directory exists based on the provided storage block name.
     * @param storageBlockName - Name of the storage block
     */
    checkDirectory(storageBlockName: string): Promise<import("../models/response").Response>;
}
