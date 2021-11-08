/**
 * Persona - Personal information storage, privacy, and security
 */
import { hashStrength, hashStrengthDetails } from './models/hash-strength';
import { personaRoot, personaSeed, personaOptions } from './models/persona-root';
import { profile, profileAttribute } from './models/profile';
import { modules } from './models/module';
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
    private key;
    module: modules;
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
     * Login will handle all the init functions after a new user is created or loaded
     */
    private login;
    /**
     * Load modules - Refreshes modules with new data, and removes any stale data
     * @returns
     */
    private loadModules;
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
}
