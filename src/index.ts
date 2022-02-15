/**
 * Persona - Personal information storage, privacy, and security
 */
import { hashStrength, hashStrengthDetails } from './models/hash-strength';
import { personaRoot, personaSeed, personaOptions } from './models/persona-root';
import { systemData }  from './models/system';
import { profile, profileAttribute } from './models/profile';
import { cypher } from './helpers/cypher';
import { generic } from './helpers/generic';
import { response } from './helpers/response';
import { defaults } from './config';

/* Independant Modules */
import { StorageBlock } from './modules/storage-block';
import { StorageBlockDirectory } from './modules/storage-block-directory';
import { modules } from './models/module';

// Export some models for referencing
export { hashStrength, hashStrengthDetails };
export { personaRoot, personaSeed, personaOptions };
export { profile, profileAttribute };

import { readFile, stat } from 'fs/promises';
let uuid = require('uuid-random');
var fs = require("fs");
var path = require("path");

export class persona {

    private appName: string = defaults.appName; // Your application name
    private path: string = defaults.path; // Current Personas folder location
    private current: personaRoot = null; // The currently loaded Persona (Encrypted/unusable)
    private recentList: Array<personaSeed> = []; // A list of all recently loaded personas
    private previous: personaSeed = null; // Last opened Persona (usable)
    private profile: profile = null; // Stores version of profile data (usable)
    private username: string = null; // The current temp username (usable)
    private password: string = null; // The current temp password (usable)
    private key: string = null; // The key used for encryption

    // Modules
    public module : modules = {
        storageBlock : null,
        storageBlockDirectory : null
    };

    /**
     * Constructor - Used to assign personaOptions.
     * @param options 
     */
    public constructor(options:personaOptions = null){

        if(options?.path !== undefined) this.path = options.path;
        if(options?.recentList !== undefined) this.recentList = options.recentList;
        if(options?.previous !== undefined) this.previous = options.previous;
        if(options?.previous?.username !== undefined) this.username = options.previous.username;
        if(options?.appName !== undefined) this.appName = options.appName;

        // Create directory
        if(!fs.existsSync(this.path)) fs.mkdirSync(this.path, { recursive: true });
    }

    /**
     * Return null if user was never loggedIn, returns previous if there was a previous persona user.
     */
    public isLoggedIn() {
        return this.username != null && this.password != null ? response.success(`${this.username} is currently logged in.`) : 
        this.previous !== null ? response.failed(`${this.previous.username} is not currently logged in.`, this.previous) : response.failed(`No user is currently logged in.`, null);
    }

    /**
     *  Returns the current Persona's id or null if not loggedIn
     */
    public getId (){
        return this.username != null && this.password != null ? response.success(`${this.username}'s id was found.`, this.current.id) : 
        response.failed(`No user is currently logged in.`, null);
    }

    /**
     * Return the currently loaded username inside the standard response body
     */
    public getUsername() {
        return this.username != null ? response.success(`${this.username} was found.`, this.username) : 
        this.previous !== null ? response.failed(`${this.previous.username} is not currently logged in.`) : response.failed(`No user is currently logged in.`);
    }

    /**
     * Get the current Persona's profile details
     * @returns 
     */
    public getProfile(){
        return this.profile === null ? response.failed(`No current profile exists.`) : response.success(`${this.username}'s profile has been loaded successfully.`, this.profile);
    }

    /**
     * Save Persona's profile details
     * @returns 
     */
    public async saveProfile(newProfile: profile){
        if(this.username === null || this.password === null) return response.failed(`No current profile exists.`) 
        this.profile = newProfile;
        this.current.profile = cypher.encrypt(JSON.stringify(newProfile), this.key);
        await this.save();
        return response.success(`${this.username}'s profile was saved successfully.`);
    }

    /**
     * Get all recently loaded profiles
     * @returns 
     */
    public getRecentList(){
        return this.recentList !== null ? response.success(`Success, ${this.recentList.length} Prsonas found.`, this.recentList) : response.failed(`Could not find any recently loaded Prsonas.`);
    }

    /**
     * Add a new entry to the recently loaded list.
     * @param recentlyLoadedPersona 
     */
    private async addRecentListItem( recentlyLoadedPersona : personaSeed ){
        if(!this.recentList.includes(recentlyLoadedPersona)){
            this.recentList.push(recentlyLoadedPersona);
        }
        await this.systemSave();
    }
    

    /**
     * Load temporal persona system data that can be used to house common data outside of the persona's
     */
    public async systemLoad(){
        let filename = `${this.path}\\${defaults.system}`;
        var message = null;
        if(fs.existsSync(filename)){
            try{
                message = response.success(`System data was loaded successfully.`, JSON.parse(await generic.fileLoad(filename)));
            } 
            catch {
                message = response.failed(`Failed to load System data, file might be locked or is corrupted.`);
            }
        } else {
            message = response.failed(`No System data file exists.`);
        }

        if(message.status){
            try{
                this.recentList = message.data.recentList;
                this.username = message.data.previous?.username || null;
                this.previous = message.data.previous;
            } catch {
                message = response.failed(`Failed to setup System data.`);
            }
        }
        return message;
    }

    /**
     * Save temporal persona system data that can be used to house common data outside of the persona's
     */
    public async systemSave(){
        if(this.current !== null){
            this.previous = { 
                id: this.current.id, 
                username: this.username, 
                avatar: this.profile?.avatar != null ? this.profile.avatar : null 
            };
        } else {  
            this.previous = null;  
        }
        let systemData : systemData = {
            previous : this.previous,
            recentList : this.recentList
        };
        let wasSaved = await generic.fileUpdate(this.path, `${defaults.system}`, JSON.stringify(systemData));
        return wasSaved ? response.success(`System data was saved successfully.`) : response.failed(`Failed to save system data.`);
    }

    /**
     * Unloads all currently loaded data. Essentially the same as logging out.
     * @returns 
     */
    public async unload(){
        if(this.current === null) return response.failed(`Persona cannot be unloaded because no Persona loaded.`);
        await this.systemSave();
        this.current = null;
        this.username = null;
        this.key = null;
        this.password = null;
        this.profile = null;
        this.loadModules();
        return response.success(`Successfully logged out of the Persona ${this.previous.username}.`);
    }


    /**
     * Login will handle all the init functions after a new user is created or loaded
     */
    private login(){
        this.loadModules();
    }


    /**
     * Load modules - Refreshes modules with new data, and removes any stale data
     * @returns 
     */
    private loadModules() {
        if(this.current === null){
            this.module = null;
        } else {
            this.module = {
                storageBlock : new StorageBlock({ path:  this.path, appName: this.appName, personaId: this.current.id, key: this.key}),
                storageBlockDirectory : new StorageBlockDirectory({ path:  this.path, appName: this.appName, personaId: this.current.id, key: this.key}) 
            }
        }
    }

    /**
     * Find Persona based on username. Use password to decrypt. Load additional storage blocks based on datamap parameter.
     * @param username - Unique username associated with the Persona.
     * @param password - Master password associated with the Persona.
     * @param dataMap - Only pull back the sorage blocks you need to get started.
     */
    public async load(username: string = null, password:string = null){
        await this.unload();
        let id = await this.find(username, password);
        if(id !== null){
            return await generic.fileLoad(`${this.path}\\${id}\\${defaults.root}`).then( async (content) => {
                let persona : personaRoot = JSON.parse(content);
                this.key = password;
                    if(await cypher.verify(this.key, persona.password)){
                        this.password = password;
                        this.username = username;
                        this.current = persona;
                        this.profile = JSON.parse(cypher.decrypt(persona.profile, this.key));
                        await this.addRecentListItem({ id: id, username : username, avatar: this.profile?.avatar || null, location: `${this.path}\\${id}` });
                        this.login();
                        return response.success(`${username}, Welcome back!`);
                    } else {
                        return response.failed("The username or password is incorrect.");
                    }          
            });
        } else {
            return response.failed("The username or password is incorrect.");
        }
    }

    /**
     * Delete a Persona and all data storage.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    public async delete(username: string = null, password: string = null){
        username = username === null ? this.username : username;
        password = password === null ? this.password : password;
        let id = await this.find(username, password);
        if(id !== null){
            try{
                await fs.rmSync(this.path+"\\"+id, { recursive: true });
                await this.unload();
                return response.success(`${username}'s Persona has been deleted.`);
            } catch {
                return response.failed("Something failed when deleting this Persona.");
            }
        } else {
            return response.failed("Could not find a valid Persona or it has already been deleted.");
        }
    }

    /**
     * Allows users to create a new Persona.
     * @param username - useranme required to create new Persona.
     * @param password - password required to secure new Persona.
     * @param strength - (optional) Passsword Hashing Strength.
     * @returns response object contains a one-time recovery code as the data property
     */
    public async create (username: string, password: string, strength:hashStrength = hashStrength.medium) : Promise<any> {
        await this.unload();
        let checkIfPersonaExists = await this.find(username, password);
        if(checkIfPersonaExists !== null) return response.failed(`Persona ${username} already exists, please select a different username.`);
        let newID = await this.generatePersonaId().then((id:string) => { return id; });
        let recoveryId = cypher.generateRecoveryCode();
        let location = `${this.path}\\${newID}`;
        this.username = username;
        this.password = password;
        this.key = password;
        return await cypher.hash(this.key, Number(strength.toString())).then( async hash => {
            this.current = {
                id: newID,
                username: cypher.encrypt(username, this.key),
                password: hash,
                strength: strength,
                profile: cypher.encrypt(`{"firstName":"", "lastName":""}`, this.key),
                mfa: "none",
                recovery: cypher.encrypt(this.key, recoveryId),
                link: []
            }
            await this.addRecentListItem({ id: newID, username : username, avatar: null, location: location });
            let newRes = await generic.fileUpdate(location, `${defaults.root}`, JSON.stringify(this.current));
            this.login();
            return newRes ? response.success(`Persona ${this.username} successfully created.`, recoveryId) : response.failed(`Persona ${this.username} failed to be created. Please check folder permissions.`) ;
        });
    }

    /**
     * Save the currently loaded Persona.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    public async save(){
        if( this.current !== null && this.username !== null && this.password !== null){
            let newRes = await generic.fileUpdate(`${this.path}\\${this.current.id}`, `${defaults.root}`, JSON.stringify(this.current));
            return newRes ? response.success(`Persona ${this.username} successfully created.`) : response.failed(`Persona ${this.username} failed to be created. Please check folder permissions.`) ;
        } else {
            return response.failed('Persona failed to be saved. No Persona is active.');
        }
    }

    /**
     * Find a Persona with username and password
     * @param username 
     * @param password 
     * @returns 
     */
    private async find(username:string = null, password:string = null){
        let key = password;
        if(this.current !== null && password === this.password && username === this.username) return this.current.id
        let files : Array<string> = await fs.promises.readdir(this.path);
        let id = null;
       
        id = await generic.asyncFind(files, async (personaId:string) => {
            let personaFolder = `${this.path}\\${personaId}`;
            if(fs.lstatSync(personaFolder).isDirectory()){
                let rootFile = JSON.parse(await generic.fileLoad(`${personaFolder}\\${defaults.root}`));
                return username === cypher.decrypt(rootFile.username, key);
            }
        });
        return id === null || id === undefined || typeof id  !== 'string' ? null : id;
    }

    /**
     * Checks if existing system IDs in path to check if ID is truly unique
     * @param path - Location to check if unique ID is actually unique
     * @returns 
     */
    private async generatePersonaId() : Promise<string> {
        let newId : string = uuid();
        if(fs.existsSync(path)){
            let files : Array<string> = await fs.promises.readdir(this.path);
            while (files.includes(newId)) { newId = uuid(); }
        }
        return newId;
    }

}