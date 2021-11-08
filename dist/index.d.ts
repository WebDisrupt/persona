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
    isLoggedIn(): import("./models/response").Response;
    /**
     *  Returns the current Persona's id or null if not loggedIn
     */
    getId(): import("./models/response").Response;
    /**
     * Return the currently loaded username inside the standard response body
     */
    getUsername(): import("./models/response").Response;
    /**
     * Get the current Persona's profile details
     * @returns
     */
    getProfile(): import("./models/response").Response;
    /**
     * Save Persona's profile details
     * @returns
     */
    saveProfile(newProfile: profile): Promise<import("./models/response").Response>;
    /**
     * Switches to a new profile
     * @param username
     * @param password
     */
    switch(username: string, password: string): Promise<import("./models/response").Response>;
    /**
     * Get all recently loaded profiles
     * @returns
     */
    getRecentList(): import("./models/response").Response;
    /**
     * Add a new entry to the recently loaded list.
     * @param recentlyLoadedPersona
     */
    private addRecentListItem;
    /**
     * Load temporal persona system data that can be used to house common data outside of the persona's
     */
    systemLoad(): Promise<import("./models/response").Response>;
    /**
     * Save temporal persona system data that can be used to house common data outside of the persona's
     */
    systemSave(): Promise<import("./models/response").Response>;
    /**
     * Unloads all currently loaded data. Essentially the same as logging out.
     * @returns
     */
    unload(): Promise<import("./models/response").Response>;
    /**
     * Find Persona based on username. Use password to decrypt. Load additional storage blocks based on datamap parameter.
     * @param username - Unique username associated with the Persona.
     * @param password - Master password associated with the Persona.
     * @param dataMap - Only pull back the sorage blocks you need to get started.
     */
    load(username?: string, password?: string): Promise<import("./models/response").Response>;
    /**
     * Delete a Persona and all data storage.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    delete(username?: string, password?: string): Promise<import("./models/response").Response>;
    /**
     * Allows users to create a new Persona.
     * @param username - useranme required to create new Persona.
     * @param password - password required to secure new Persona.
     * @param strength - (optional) Passsword Hashing Strength.
     * @returns response object contains a one-time recovery code as the data property
     */
    create(username: string, password: string, strength?: hashStrength): Promise<any>;
    /**
     * Save the currently loaded Persona.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    save(): Promise<import("./models/response").Response>;
    /**
     * Find a Persona with username and password
     * @param username
     * @param password
     * @returns
     */
    private find;
    /**
     * Checks if existing system IDs in path to check if ID is truly unique
     * @param path - Location to check if unique ID is actually unique
     * @returns
     */
    private generatePersonaId;
    /**
     * Checks whether the storage block id exists.
     * @param id - pass in the storage block id
     * @returns
     */
    SB_doesIdExist(storageBlockId: string): boolean;
    /**
     * Check if storage block exists
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns {boolean}
     */
    SB_exist(storageBlockId: string): Promise<boolean>;
    /**
     * Returns a properly formated data block id. You can pass in an encrypted, or decrypted version, or just a data block name.
     * @param unkown Takes an id in an unknown state
     * @param encrypt returns it encrupted or dcrypted
     * @returns
     */
    SB_formatId(unknown: string, encrypt?: boolean): Promise<any>;
    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns
     */
    SB_load(storageBlockId: string): Promise<import("./models/response").Response>;
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    SB_loadAll(objectMap?: any): Promise<import("./models/response").Response>;
    /**
     * Saves a block of data to an existing block or creates a new block.
     * @param storageBlockId - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns
     */
    SB_save(storageBlockId: string, content: any): Promise<import("./models/response").Response>;
    /**
     * Creates a new storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    private SB_create;
    /**
     * Updates an existing Storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    private SB_update;
    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    SB_delete(storageBlockId?: string): Promise<import("./models/response").Response>;
    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns
    */
    SB_getList(): import("./models/response").Response;
    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns
    */
    SB_removeFromList(storageBlockId: string): import("./models/response").Response;
    /**
     * Save the entire file structure inside a directory to a storage block. Does not save empty directories
     * @param directoryPath - Directory you would like to save
     * @param storageBlockId
     */
    SBD_save(directoryPath: string, storageBlockId: string, clearDirectory?: boolean): Promise<import("./models/response").Response>;
    /**
     * Create a new directory baed on a storage block
     * @param storageBlockId - Storage block that
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    SBD_load(storageBlockId: string, newLocation?: string): Promise<import("./models/response").Response>;
    /**
     * Get storage block path based on storage block id
     * @param storageBlockId
     * @returns
     */
    SBD_getDirectoryPath(storageBlockId: string): Promise<any>;
    /**
     * Storage Block Directory - Get version from the pstore.version file inside the directory
     * @param storageBlockId - Storage block that
     * @return New version
     */
    SBD_getFileVersion(storageBlockId: string): Promise<number>;
    /**
     * Storage Block not having
     * @param storageBlockId - Storage block that
     * @return New version
     */
    SBD_increaseVersion(storageBlockId: string): Promise<number>;
    /**
     * Removes a directory and all files inside that directory based on storage block name.
     * @param storageBlockId - Name of the storage block
     */
    SBD_clearDirectory(storageBlockId: string): Promise<import("./models/response").Response>;
    /**
     * Checks if a directory exists based on storage block name.
     * @param storageBlockId - Name of the storage block
     */
    SBD_doesDirectoryExist(storageBlockId: string): Promise<import("./models/response").Response>;
}
