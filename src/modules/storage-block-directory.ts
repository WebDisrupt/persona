
import { generic } from '../helpers/generic';
import { cypher } from '../helpers/cypher';
import { defaults } from '../config';
import { response } from '../helpers/response';
import { personaRoot } from '../models/persona-root';
import { moduleOptions } from '../models/module';
import { StorageBlock } from '../modules/storage-block'

var recursive = require("recursive-readdir");
var fs = require("fs");

export class StorageBlockDirectory extends StorageBlock {

    /**
     * Constructor - Used to assign personaOptions.
     * @param options 
     */
    public constructor(options:moduleOptions = null){
        super(options);
    }

    /**
     * Save the entire file structure inside a directory to a storage block. Does not save empty directories
     * @param directoryPath - Directory you would like to save
     * @param storageBlockName 
     */
    public async dirSave(directoryPath: string, storageBlockName:string, clearDirectory : boolean = false){
        let previousVersion : number = (await this.load(storageBlockName)).data?.version || 0;
        let newVersion : number = (previousVersion + 1);
        let fileDirectory = await recursive(directoryPath);
        let directoryContent = [];
        for (let index = 0; index < fileDirectory.length; index++) {
            try{
                let name = fileDirectory[index].substr(fileDirectory[index].lastIndexOf("\\"));
                directoryContent.push({ path: fileDirectory[index].replace(name, ''), name: name.substr(("\\").length),  content : (await generic.fileLoad(fileDirectory[index])).toString() });      
            } catch { } // Fail silently on bad files
        }
        let response = await super.save(storageBlockName, { type: "dir", version: newVersion, path: directoryPath, files: directoryContent });
        if(response.status) await this.setVersionFile(storageBlockName, newVersion);
        if(clearDirectory) await this.dirRemove(storageBlockName);
        return response;
    }

    /**
     * Create a new directory baed on a storage block
     * @param storageBlockName - Storage block that
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    public async dirLoad(storageBlockName: string, newLocation: string = null){
        try {
            let fileDirectory = await super.load(storageBlockName);
            fileDirectory.data = JSON.parse(fileDirectory.data);
            let files = fileDirectory.data.files;
            let thisPath = newLocation !== null ? newLocation : fileDirectory.data.path;
            
            if(fileDirectory.status){
                if(Number(fileDirectory.data.version) > await this.getVersionFile(storageBlockName)){
                    for (let index = 0; index < files.length; index++) {
                        await generic.fileUpdate(files[index].path.replace(fileDirectory.data.path, thisPath), files[index].name, files[index].content);
                    }
                    await this.setVersionFile(storageBlockName, Number(fileDirectory.data.version));
                    return response.success(`Directory ${thisPath} successfully loaded from storage block.`);
                } else {
                    return response.failed(`Loaded version is greater please save progress of ${storageBlockName}.`);
                }
            } else {
                return response.failed(`Data storage block called ${storageBlockName} was found.`);
            }
        } catch {
            return response.failed(`Data storage block ${storageBlockName} failed to load.`);
        }
    }

    /**
     * Get storage block path based on storage block id
     * @param storageBlockName 
     * @returns 
     */
    public async dirPath(storageBlockName: string){
        try{
            return response.success(`The ${storageBlockName} path was return successfully.`, JSON.parse((await super.load(storageBlockName)).data).path);
        } catch {
            return response.failed(`The ${storageBlockName} storage block doesn't exist.`);
        }
    }

    /**
     * Storage Block Directory - Get version from the pstore.version file inside the directory
     * @param storageBlockName - Storage block that
     * @return New version
     */
    public async getVersionFile(storageBlockName : string){
        let thisPath = (await this.dirPath(storageBlockName)).data;
        return await fs.existsSync(thisPath+"\\"+defaults.versionName) ? Number(await generic.fileLoad(thisPath+"\\"+defaults.versionName)) : 0;
    }

    /**
     * Storage Block not having
     * @param storageBlockName - Storage block that
     * @param version - Set a new version, if empty increment by 1
     * @return New version
     */
    public async setVersionFile(storageBlockName : string, version: number = null){
        let thisPath = (await this.dirPath(storageBlockName)).data;
        let previousVersion : number  = 0;
        try{
            previousVersion = Number(await generic.fileLoad(thisPath+"\\"+defaults.versionName));
        } catch { } // Fail silently if you can't find bersion file
        let newVersion : string = version === null ? ( previousVersion + 1 ).toString() : version.toString();
        await generic.fileUpdate(thisPath, defaults.versionName, newVersion);
        return Number(newVersion);
    }

    /**
     * Removes a directory and all files inside that directory based on storage block name.
     * @param storageBlockName - Name of the storage block
     */
    public async dirRemove(storageBlockName:string){
        try {
            fs.rmdirSync((await this.dirPath(storageBlockName)).data, { recursive: true });
            return response.success("The storage block directory was deleted successfully.");
        } catch {
            return response.failed("The storage block directory failed to be deleted.");
        }
    }

    /**
     * Checks if a directory exists based on the provided storage block name.
     * @param storageBlockName - Name of the storage block
     */
    public async dirExists(storageBlockName: string){
        try {
            if(fs.existsSync((await this.dirPath(storageBlockName)).data)){
                return response.success("The storage block folder exists.");
            } else {
                return response.failed("The storage block folder does not exist.");
            }
        } catch {
            return response.failed("Failed to load corrupted storage block or you don't have the right access permissions");
        }
    }

}