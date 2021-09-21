/**
 * Persona - Personal information storage, privacy, and security
 */
import { hashStrength, hashStrengthDetails } from './models/hash-strength';
import { personaRoot, personaSeed, personaOptions } from './models/persona-root';
import { profile, profileAttribute } from './models/profile';
export { hashStrength, hashStrengthDetails };
export { personaRoot, personaSeed, personaOptions };
export { profile, profileAttribute };
export declare class persona {
    private readonly root;
    private readonly ext;
    private readonly blockExt;
    private readonly system;
    private appName;
    private path;
    private current;
    private recentList;
    private previous;
    private profile;
    private username;
    private password;
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    constructor(options?: personaOptions);
    /**
     * Return null if user was never loggedIn, returns previous if there was a previous persona user.
     */
    isLoggedIn(): {
        status: boolean;
        message: string;
        data: any;
    };
    /**
     *  Returns the current Persona's id or null if not loggedIn
     */
    getId(): {
        status: boolean;
        message: string;
        data: any;
    };
    /**
     * Return the currently loaded username inside the standard response body
     */
    getUsername(): {
        status: boolean;
        message: string;
        data: any;
    };
    /**
     * Get the current Persona's profile details
     * @returns
     */
    getProfile(): {
        status: boolean;
        message: string;
        data: any;
    };
    /**
     * Save Persona's profile details
     * @returns
     */
    saveProfile(newProfile: profile): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Switches to a new profile
     * @param username
     * @param password
     */
    switch(username: string, password: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Get all recently loaded profiles
     * @returns
     */
    getRecentList(): {
        status: boolean;
        message: string;
        data: any;
    };
    /**
     * Add a new entry to the recently loaded list.
     * @param recentlyLoadedPersona
     */
    private addRecentListItem;
    /**
     * Load temporal persona system data that can be used to house common data outside of the persona's
     */
    systemLoad(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Save temporal persona system data that can be used to house common data outside of the persona's
     */
    systemSave(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Unloads all currently loaded data. Essentially the same as logging out.
     * @returns
     */
    unload(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Find Persona based on username. Use password to decrypt. Load additional storage blocks based on datamap parameter.
     * @param username - Unique username associated with the Persona.
     * @param password - Master password associated with the Persona.
     * @param dataMap - Only pull back the sorage blocks you need to get started.
     */
    load(username?: string, password?: string, dataMap?: Array<string>): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Delete a Persona and all data storage.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    delete(username?: string, password?: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Allows users to create a new Persona.
     * @param username - useranme required to create new Persona.
     * @param password - password required to secure new Persona.
     * @param strength - (optional) Passsword Hashing Strength.
     * @returns Response object contains a one-time recovery code as the data property
     */
    create(username: string, password: string, strength?: hashStrength): Promise<any>;
    /**
     * Save the currently loaded Persona.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    save(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    loadStorageBlocks(objectMap?: any): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Loads a block of data form an existing block.
     * @param dataId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns
     */
    loadStorageBlock(dataId: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Saves a block of data to an existing block or creates a new block.
     * @param id - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns
     */
    saveStorageBlock(dataId: string, content: any): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Delete a storage block
     * @param dataId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    deleteStorageBlock(dataId?: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Find a Persona with username and password
     * @param username
     * @param password
     * @returns
     */
    private find;
    /**
     * Save updates to an existing file. If that files doesn't exsist then it creates the file and recursive folder structure.
     * @param path - path to file
     * @param filename - filename + extenton
     * @param data - The data needing to be saved
     * @returns true or error
     */
    private updateFile;
    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns
     */
    private asyncSome;
    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns
     */
    private asyncFind;
    /**
     * Load updates from an existing file
     * @param filename - path + filename + extenton
     * @returns file contents or error
     */
    private loadFile;
    /**
     * Checks if existing system IDs in path to check if ID is truly unique
     * @param path - Location to check if unique ID is actually unique
     * @returns
     */
    private generatePersonaId;
    /**
     * Chekcs whether the storage block id exists.
     * @param id - pass in the storage block id
     * @returns
     */
    private doesStorageBlockIdExist;
    /**
     * Generates a new unique id within in the data list
     * @param list
     * @returns
     */
    private generateStorageId;
    /**
     * Returns a properly formated data block id. You can pass in an encrypted, or decrypted version, or just a data block name.
     * @param unkown Takes an id in an unknown state
     * @param encrypt returns it encrupted or dcrypted
     * @returns
     */
    private setDataBlockID;
    /**
     * Gets all the storage block that are defined inside the current Persona.
     * @returns
     */
    getStorageBlockList(): {
        status: boolean;
        message: string;
        data: any;
    };
    /**
     * Creates a new storage block, can't be called directly.
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    private createStorageBlock;
    /**
     * Updates an existing Storage block, can't be called directly.
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    private updateStorageBlock;
    /**
     * Save the entire file structure inside a Directory to a storage block. Does not save empty directories
     * @param directoryPath - Directory you would like to save
     * @param storageBlockId
     */
    directorySaveToStorageBlock(directoryPath: string, storageBlockId: string, clearDirectory?: boolean): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Cretae a new directory baed on a storage block
     * @param storageBlockId - Storage block that
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    directoryLoadFromStorageBlock(storageBlockId: string, newLocation?: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    /**
     * Removes a directory and all files inside that directory
     */
    directoryClear(directoryPath: string): void;
}
