/**
 * Persona - Personal information storage, privacy, and security
 */

import { personaRoot, personaSeed, hashStrength} from './models/core';
import { cypher } from './modules/cypher';
import { response } from './modules/response';
let uuid = require('uuid-random');
var fs = require("fs");
var path = require("path");

export interface personaOptions { 
    appName?:string,
    path?:string,
    previous?: string,
    recentList?:Array<personaSeed>
}

export class persona {

    private readonly root : string = "root.persona"; // The root file naming convention
    private readonly ext : string = ".pstore"; // The extention for personas data storage
    private appName : string = "default"; // Your application name
    private path : string = "C:\\personas"; // Current Personas folder location
    private recentList : Array<personaSeed> = []; // A list of all recently loaded personas
    private current: personaRoot = null; // The currently loaded persona
    private username : string = null; // The current temp username
    private password: string = null; // The current temp password

    public constructor(options:personaOptions = null){
        if(options?.path !== undefined) this.path = options.path;
        if(options?.recentList !== undefined) this.recentList = options.recentList;
        if(options?.previous !== undefined){
         this.username = options.previous;
         // TODO load previous
        }
        if(options?.appName !== undefined) this.appName = options.appName;
    }

    public discovery() : string {
        if(this.username != null){
            return this.username;
        } return null;
    }

    public isLoggedIn() : boolean{
        return this.username != null && this.password != null ? true : false;
    }

    public switch( username : string, password:string ){
        this.username = username;
        this.username = password;
        this.load();
    }


    /**
     * Find a persona with username and password
     * @param username 
     * @param password 
     * @returns 
     */
    private async find(username:string = null, password:string = null){
        if(this.current !== null && password === this.password && username === this.username) return this.current.id
        let files : Array<string> = await fs.promises.readdir(this.path);
        let id = null;
        id = await this.asyncFind(files, async (personaId:string) => {
            let rootFile = JSON.parse(await this.loadFile(`${this.path}\\${personaId}\\${this.root}`));
            return username === cypher.decrypt(rootFile.username, password+username);
        });
        return id === null || id === undefined || typeof id  !== 'string' ? null : id;
    }

    /**
     * Get all recently loaded profiles
     * @returns 
     */
    public getRecentList(){
        return this.recentList;
    }

    public addRecentListItem( recentlyLoadedPersona : personaSeed ){
        if(!this.recentList.includes(recentlyLoadedPersona)){
            this.recentList.push(recentlyLoadedPersona);
        }
    }

    /**
     * Unloads all stored data. Essentially the same as logging out.
     * @returns 
     */
    public unload(){
        let tempUsername = this.username;
        this.current = null;
        this.username = null;
        this.password = null;
        return response.success(`Successfully logged out of the Persona ${tempUsername}.`);
    }

    /**
     * Find Persona based on username. Use password to decrypt. Load storage blocks based on datamap parameter.
     * @param username - Unique username associated with the persona
     * @param password - Master password associated with the persona
     * @param dataMap - Only pull back the sorage blocks you need
     */
    public async load(username: string = null, password:string = null, dataMap: Array<string> = null){
        username = username === null ? this.username : username;
        password = password === null ? this.password : password;

        let id = await this.find(username, password);
        if(id !== null){
            return await this.loadFile(this.path+"\\"+id+"\\"+this.root).then( async (content) => {
                let persona : personaRoot = JSON.parse(content);
                    if(await cypher.verify(password+username, persona.password)){
                        this.password = password;
                        this.username = username;
                        this.current = persona;
                        if(dataMap != null){
                           /* dataMap.forEach((block:string) => {
                                block                            
                            }); */
                        } else {
                            return true;
                        }
                    } else {
                        return false;
                    }          
            });
        } else {
            return false;
        }
    }

   /**
    * Delete a persona and all data storage
    * @param username (optional) - Needed for creating a new persona, before saving
    * @param password (optional) - Needed for creating a new persona, before saving
    */
    public async delete(username: string = null, password: string = null){
        username = username === null ? this.username : username;
        password = password === null ? this.password : password;
        let id = await this.find(username, password);
        if(id !== null){
            try{
                await fs.rmdirSync(this.path+"\\"+id, { recursive: true });
                this.unload();
                return true;
            } catch {
                return false;
            }
        } else {
            return false;
        }
    }

    /**
     * Allows users to create a new Persona
     * @param username - useranme
     * @param password - password
     * @param strength - (optional) Passsword Hashing Strength
     */
       public async create (username: string, password: string, strength:hashStrength = hashStrength.medium) : Promise<any> {
        let files : Array<string> = await fs.promises.readdir(this.path);
        let checkIfPersonaExists = await this.asyncSome(files, async (personaId:string) => {
            let rootFile = JSON.parse(await this.loadFile(`${this.path}\\${personaId}\\${this.root}`));
            return username === cypher.decrypt(rootFile.username, password+username);
        });

        if(checkIfPersonaExists) return Promise.reject('Persona already exists, please select a different username.');
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
            this.addRecentListItem({ id: newID, username : username, avatar: null });
            return await this.updateFile(location, this.root, JSON.stringify(newProfile));
        });
    }

   /**
    * Save the currently loading persona
    * @param username (optional) - Needed for creating a new persona, before saving
    * @param password (optional) - Needed for creating a new persona, before saving
    */
    public async save(){
        if( this.current !== null && this.username !== null && this.password !== null){
            return await this.updateFile(`${this.path}\\${this.current.id}`, this.root, JSON.stringify(this.current));
        }
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
                reject(new Error( "Can not find the file you specified." ));
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
        if(this.current.link != null) while (this.current.link.some( item => {  return item.includes(newId) } )) { newId = uuid(); }
        return newId;
    }


    /**
     * Saves a block of data to an existing block or creates a new block
     * @param data The id property is required to identify the blocks purpose and if it already exists.
     * @returns 
     */
     public async loadStorageBlock(dataId : string){
        let id = await this.setDataBlockID(dataId, true);
        let getProperId = (await this.setDataBlockID(dataId, false)).split("|");
        return await this.loadFile(`${this.path}\\${this.current.id}\\${getProperId[0]}${this.ext}`).then( async (content) => {
            return response.success(`Data storage block was loaded successfully. [${dataId}]`, cypher.decrypt(content.toString(), this.password+this.username));
        });
     }

    /**
     * Saves a block of data to an existing block or creates a new block
     * @param id - Required to identify where, how, and when this data will be used in your application.
     * @param content - A blanked string that can be formated how ever you would like to consume it with your application.
     * @returns 
     */
    public async saveStorageBlock(dataId: string, content:string){
        dataId = await this.setDataBlockID(dataId);
        if(this.current === null) return response.failed("No profile loaded.");
        if(dataId === undefined || dataId === null) return response.failed("No storage id provided.");
        let checkIfBlockExists = this.current.link.some( item => {
            let block = cypher.decrypt(item, this.password+this.username).split("|");
            return block[1] === this.appName && block[2] === dataId;
        });
        if(!checkIfBlockExists) await this.createStorageBlock(dataId, content)
        if(checkIfBlockExists) await this.updateStorageBlock(dataId, content)
        return response.success(`Data storage block was saved successfully. [${dataId}]`);
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
     * Creates a new storage block
     * @param dataBlock  [ id: string, content: string ]
     */
    private async createStorageBlock(id: string, content:string){ 
        let filename = id.split("|")[0];
        let personaLocation = `${this.path}\\${this.current.id}`;
        this.current.link.push( cypher.encrypt(id, this.password+this.username) );
        try {
            let blockContent = cypher.encrypt(content, this.password+this.username);
            await this.updateFile(personaLocation, `${filename}${this.ext}`, blockContent);
            await this.updateFile(personaLocation, this.root, JSON.stringify(this.current));
            Promise.resolve(true);
        } catch (err) {
            Promise.reject(err);
        }
    }

    /**
     * Updates an existing Storage block
     * @param data 
     */
    private async updateStorageBlock(id: string, content:string){
        id = this.current.link.find( item => {
            let block = cypher.decrypt(item, this.password+this.username).split(":");
            return block[1] === this.appName && block[2] === id;
        });
        let personaLocation = `${this.path}\\${this.current.id}`;
        try {
            let blockContent = cypher.encrypt(JSON.stringify(content), this.password+this.username);
            await this.updateFile(personaLocation, `${id.split(":")[0]}${this.ext}`, blockContent);
            Promise.resolve(true);
        } catch (err) {
            Promise.reject(err);
        }
    }

    /**
    * Delete a storage block
    * @param dataId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks.
    */
    public async deleteStorageBlock(dataId : string = null) {
        let personaId = await this.find(this.username, this.password);
        dataId = await this.setDataBlockID(dataId);
        if(personaId !== null){
            if(dataId === null){
                let files : Array<string> = await fs.promises.readdir(this.path+"\\"+personaId);
                try{
                    files.forEach( file => {
                        if(file !== this.root){
                            fs.unlinkSync(this.path+"\\"+personaId+"\\"+file);
                        }
                    });
                    return response.success(`Successfully deleted all storage blocks.`);
                } catch {
                    return response.failed(`Could not find any storage blocks to delete.`);
                }
            } else {
                try {
                    fs.unlinkSync(this.path+"\\"+personaId+"\\"+(dataId.split('|')[0])+this.ext);
                    return response.success(`Successfully deleted data storage block.[${dataId}]`);
               } catch (err) {
                    return response.failed(`Failed to find the data storage block.[${dataId}]`);
                }
            }
        } else {
            return response.failed(`Failed to delete data storage block(s) because no persona was found.`);
        }
    }
}