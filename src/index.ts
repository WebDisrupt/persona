/**
 * Persona - Personal information storage, privacy, and security
 */
import { hashStrength, hashStrengthDetails } from './models/hash-strength';
import { personaRoot, personaSeed, personaOptions } from './models/persona-root';
import { systemData }  from './models/system';
import { profile, profileAttribute } from './models/profile';
import { cypher } from './modules/cypher';
import { response } from './modules/response';

// Export some models for referencing
export { hashStrength, hashStrengthDetails };
export { personaRoot, personaSeed, personaOptions };
export { profile, profileAttribute };

let uuid = require('uuid-random');
var fs = require("fs");
import { readFile } from 'fs/promises';
var path = require("path");

export class persona {

    private readonly root : string = "root"; // The root file naming convention
    private readonly ext : string = ".persona"; // The extention for personas data storage
    private readonly blockExt : string = ".pstore"; // The extention for personas data storage
    private readonly system : string = "system"; // The system file naming convention
    private appName : string = "default"; // Your application name
    private path : string = "C:\\personas"; // Current Personas folder location
    private current: personaRoot = null; // The currently loaded Persona (Decrypted/unusable)
    private recentList : Array<personaSeed> = []; // A list of all recently loaded personas
    private previous: personaSeed = null; // Last opened Persona (usable)
    private profile: profile = null; // Stores version of profile data (usable)
    private username : string = null; // The current temp username (usable)
    private password: string = null; // The current temp password (usable)

    /**
     * Constructor - Used to assign personaOptions.
     * @param options 
     */
    public constructor(options:personaOptions = null){
        if(options?.path !== undefined) this.path = options.path;
        if(options?.recentList !== undefined) this.recentList = options.recentList;
        if(options?.previous !== undefined ){
            this.username = options.previous.username;
            this.previous = options.previous;
        }
        if(options?.appName !== undefined) this.appName = options.appName;

        // Create directory
        if(!fs.existsSync(this.path)) fs.mkdirSync(this.path, { recursive: true });
    }

    /**
     * Return null if user was never loggedIn, returns previous if there was a previous persona user.
     */
    public isLoggedIn() {
        return this.username != null && this.password != null ? response.success(`${this.username} is currently logged in`) : 
        this.previous !== null ? response.failed(`${this.previous.username} is not currently logged in.`, this.previous) : response.failed(`No user is currently logged in.`, null);
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
        this.current.profile = cypher.encrypt(JSON.stringify(newProfile), this.password+this.username);
        await this.save();
        return response.success(`${this.username}'s profile was saved successfully.`);
    }

    /**
     * Switches to a new profile
     * @param username 
     * @param password 
     */
    public async switch( username : string, password:string ){
        await this.unload();
        this.username = username;
        this.username = password;
        return this.load();
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
        let filename = `${this.path}\\${this.system}${this.ext}`;
        var message = null;
        if(fs.existsSync(filename)){
            try{
                message = response.success(`System data was loaded successfully.`, JSON.parse(await readFile(filename, {encoding:"utf8"})));
            } 
            catch {
                message = response.failed(`Failed to load System data, file might be locked or is corrupted.`);
            }
        } else {
            message = response.failed(`Failed to find System data.`);
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
        } else {  this.previous = null;  }
        let systemData : systemData = {
            previous : this.previous,
            recentList : this.recentList
        };
        let wasSaved = await this.updateFile(this.path, `${this.system}${this.ext}`, JSON.stringify(systemData));
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
        this.password = null;
        this.profile = null;
        return response.success(`Successfully logged out of the Persona ${this.previous.username}.`);
    }

    /**
     * Find Persona based on username. Use password to decrypt. Load additional storage blocks based on datamap parameter.
     * @param username - Unique username associated with the Persona.
     * @param password - Master password associated with the Persona.
     * @param dataMap - Only pull back the sorage blocks you need to get started.
     */
    public async load(username: string = null, password:string = null, dataMap: Array<string> = null){
        if(this.username !== username && this.password !== password) await this.unload();
        username = username === null ? this.username : username;
        password = password === null ? this.password : password;
        let id = await this.find(username, password);
        if(id !== null){
            return await this.loadFile(`${this.path}\\${id}\\${this.root}${this.ext}`).then( async (content) => {
                let persona : personaRoot = JSON.parse(content);
                    if(await cypher.verify(password+username, persona.password)){
                        this.password = password;
                        this.username = username;
                        this.current = persona;
                        this.profile = JSON.parse(cypher.decrypt(persona.profile, password+username));
                        await this.addRecentListItem({ id: id, username : username, avatar: this.profile?.avatar || null, location: `${this.path}\\${id}` });
                        return response.success(`${username}, Welcome back.`, dataMap !== null ? (await this.loadStorageBlocks(dataMap)).data : null);
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
                await fs.rmdirSync(this.path+"\\"+id, { recursive: true });
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
     * @returns Response object contains a one-time recovery code as the data property
     */
    public async create (username: string, password: string, strength:hashStrength = hashStrength.medium) : Promise<any> {
        await this.unload();
        let checkIfPersonaExists = await this.find(username, password);
        if(checkIfPersonaExists !== null) return response.failed(`Persona ${username} already exists, please select a different username.`);
        let newID = await this.generatePersonaId().then((id:string) => { return id; });
        let recoveryId = cypher.generateRecoveryCode();
        let location = `${this.path}\\${newID}`;
        let key = password+username;
        return await cypher.hash(key, Number(strength.toString())).then( async hash => {
            let newProfile : personaRoot = {
                id: newID,
                username: cypher.encrypt(username, key),
                password: hash,
                strength: strength,
                profile: cypher.encrypt(`{"firstName":"", "lastName":""}`, key),
                mfa: "none",
                recovery: cypher.encrypt(key, recoveryId),
                link: []
            }
            this.username = username;
            this.password = password;
            this.current = newProfile;
            await this.addRecentListItem({ id: newID, username : username, avatar: null, location: location });
            let newRes = await this.updateFile(location, `${this.root}${this.ext}`, JSON.stringify(newProfile));
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
            let newRes = await this.updateFile(`${this.path}\\${this.current.id}`, `${this.root}${this.ext}`, JSON.stringify(this.current));
            return newRes ? response.success(`Persona ${this.username} successfully created.`) : response.failed(`Persona ${this.username} failed to be created. Please check folder permissions.`) ;
        } else {
            return response.failed('Persona failed to be saved. No Persona is active.');
        }
    }
    
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    public async loadStorageBlocks(objectMap : any = null){
        let newObjectMap : any = {};
        let dataIdMap : Array<string> = Object.keys(objectMap);
        for(let index in dataIdMap){
            let property : string = dataIdMap[index];
            try{
                let item = await this.loadStorageBlock(property);
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
     * Loads a block of data form an existing block.
     * @param dataId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns 
     */
    public async loadStorageBlock(dataId : string){
        let id = await this.setDataBlockID(dataId, true);
        let getProperId = (await this.setDataBlockID(dataId, false)).split("|");
        return await this.loadFile(`${this.path}\\${this.current.id}\\${getProperId[0]}${this.blockExt}`).then( async (content) => {
            return response.success(`Data storage block was loaded successfully.`, cypher.decrypt(content.toString(), this.password+this.username));
        });
    }

    /**
     * Saves a block of data to an existing block or creates a new block.
     * @param id - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns 
     */
    public async saveStorageBlock(dataId: string, content:any){
        if(typeof content !== "string") content = JSON.stringify(content);
        dataId = await this.setDataBlockID(dataId);
        if(this.current === null) return response.failed("No profile loaded.");
        if(dataId === undefined || dataId === null) return response.failed("No storage id provided.");
        let checkIfBlockExists = this.current.link.some( item => {
            let block = cypher.decrypt(item, this.password+this.username).split("|");
            return block[1] === this.appName && block[2] === dataId;
        });
        let newRes = checkIfBlockExists ? await this.updateStorageBlock(dataId, content) : await this.createStorageBlock(dataId, content);
        if(newRes.status === true){
            return response.success(`Data storage block ${dataId[2]} was saved successfully.`);
        } else {
            return newRes;
        }
    }

    /**
     * Delete a storage block
     * @param dataId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    public async deleteStorageBlock(dataId : string = null) {
        let personaId = await this.find(this.username, this.password);
        dataId = await this.setDataBlockID(dataId);
        if(personaId !== null){
            if(dataId === null){
                let files : Array<string> = await fs.promises.readdir(this.path+"\\"+personaId);
                try{
                    files.forEach( file => {
                        if(file !== `${this.root}${this.ext}`){
                            fs.unlinkSync(this.path+"\\"+personaId+"\\"+file);
                        }
                    });
                    return response.success(`Successfully deleted all storage blocks.`);
                } catch {
                    return response.failed(`Could not find any storage blocks to delete.`);
                }
            } else {
                try {
                    fs.unlinkSync(this.path+"\\"+personaId+"\\"+(dataId.split('|')[0])+this.blockExt);
                    return response.success(`Successfully deleted data storage block.[${dataId}]`);
            } catch (err) {
                    return response.failed(`Failed to find the data storage block.[${dataId}]`);
                }
            }
        } else {
            return response.failed(`Failed to delete data storage block(s) because no Persona was found.`);
        }
    }



    /// Private functions used for internal modifications only

    /**
     * Find a Persona with username and password
     * @param username 
     * @param password 
     * @returns 
     */
    private async find(username:string = null, password:string = null){
        if(this.current !== null && password === this.password && username === this.username) return this.current.id
        let files : Array<string> = await fs.promises.readdir(this.path);
        let id = null;
       
        id = await this.asyncFind(files, async (personaId:string) => {
            let personaFolder = `${this.path}\\${personaId}`;
            if(fs.lstatSync(personaFolder).isDirectory()){
                let rootFile = JSON.parse(await this.loadFile(`${personaFolder}\\${this.root}${this.ext}`));
                return username === cypher.decrypt(rootFile.username, password+username);
            }
        });
        return id === null || id === undefined || typeof id  !== 'string' ? null : id;
    }


    /**
     * Save updates to an existing file. If that files doesn't exsist then it creates the file and recursive folder structure.
     * @param path - path to file
     * @param filename - filename + extenton
     * @param data - The data needing to be saved
     * @returns true or error
     */
     private async updateFile(path:string, filename:string, data:string) :  Promise<any>{
        let errorMsg = "Failed to save file, please make sure this Application has the correct permissions.";
        return await new Promise(function(resolve, reject) {
            if(!fs.existsSync(path)){
                fs.mkdir(path, { recursive: true }, async (err:Error) => {
                    if(err){ reject(errorMsg); }
                    fs.writeFile(`${path}\\${filename}`, data, (err:Error) => { 
                        if(err){ reject(errorMsg); }
                        resolve(true);
                    });
                });
            } else {   
                fs.writeFile(`${path}\\${filename}`, data, (err:Error) => { 
                    if(err){ reject(errorMsg); }
                    resolve(true);
                });     
            }
        });
    }

    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns 
     */
    private asyncSome = async (arr:any, predicate:any) => {
        for (let e of arr) {
            if (await predicate(e)) return true;
        }
        return false;
    };

    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns 
     */
    private asyncFind = async (arr:any, predicate:any) => {
        for (let e of arr) {
            if (await predicate(e)) return e;
        }
        return null;
    };


    /**
     * Load updates from an existing file
     * @param filename - path + filename + extenton
     * @returns file contents or error
     */
    private async loadFile(filename:string) :  Promise<string>{
        return await new Promise(function(resolve, reject) {
            if(fs.existsSync(filename)){ 
                fs.readFile(filename, (err:Error, file:string) => { 
                    if(err){ reject(err); }
                    resolve(file);
                });     
            } else {
                reject(new Error( "Cannot find the file you specified." ));
            }
        });
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

    /**
     * Generates a new unique id within in the data list
     * @param list 
     * @returns 
     */
    private async generateStorageId() : Promise<string> {
        let newId : string = uuid();
        if(this.current != null && this.current.link != null) while (this.current.link.some( item => {  return item.includes(newId) } )) { newId = uuid(); }
        return newId;
    }

    /**
     * Returns a properly formated data block id. You can pass in an encrypted, or decrypted version, or just a data block name.
     * @param unkown Takes an id in an unknown state
     * @param encrypt returns it encrupted or dcrypted 
     * @returns 
     */
    private async setDataBlockID(unknown:string, encrypt:boolean = false){
        if(unknown === null) return null
        let colonCheck = unknown.includes("|") ? unknown.split("|").length : 0;
        if(colonCheck === 0){
            let newId = await this.generateStorageId().then( result =>{ return result });
            let decrypted = cypher.decrypt(unknown, this.password+this.username);
            if(typeof decrypted === "string" && decrypted.split("|").length === 3){
                return encrypt ? unknown : decrypted;
            } else {
                let exists = this.current.link.find( item => { return cypher.decrypt(item, this.password+this.username).includes(`|${this.appName}|${unknown}`) });
                return exists !== undefined ? cypher.decrypt(exists, this.password+this.username) : `${newId}|${this.appName}|${unknown}`;
            }
        } else if(colonCheck === 3){
            return encrypt ? cypher.encrypt(unknown, this.password+this.username) : unknown;
        } else {
            return null;
        }
    }

    /**
     * Creates a new storage block, can't be called directly.
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    private async createStorageBlock(id: string, content:string){ 
        try {
            let personaLocation = `${this.path}\\${this.current.id}`;
            this.current.link.push( cypher.encrypt(id, this.password+this.username) );
            await this.updateFile(personaLocation, `${id.split("|")[0]}${this.blockExt}`, cypher.encrypt(content, this.password+this.username));
            await this.updateFile(personaLocation, `${this.root}${this.ext}`, JSON.stringify(this.current));
            return response.success(`Data storage block successfully created.`);
        } catch (err) {
            return response.failed(`Data storage block ${id[2]} failed to create successfully.`);
        }
    }

    /**
     * Updates an existing Storage block, can't be called directly.
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    private async updateStorageBlock(id: string, content:string){
        try {
            await this.updateFile(`${this.path}\\${this.current.id}`, `${id.split("|")[0]}${this.blockExt}`, cypher.encrypt(content, this.password+this.username));
            return response.success(`Data storage block ${id[2]} successfully updated.`);
        } catch (err) {
            return response.failed(`Data storage block ${id[2]} failed to update successfully.`);
        }
    }

}