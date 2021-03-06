
import { generic } from '../helpers/generic';
import { defaults } from '../config';
import { response } from '../helpers/response';
import { moduleOptions } from '../models/module';
import { BaseStorageBlock } from '../core/storage-block-core';
import { progressTracker } from '../models/progress-tracker';

var recursive = require("recursive-readdir");
var fs = require("fs");

export class StorageBlockDirectory extends BaseStorageBlock {

    public progressTracker : Array<progressTracker> = [];

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
    public async save(directoryPath: string, storageBlockName:string, clearDirectory : boolean = false){
        let previousVersion : number = (await this.load(storageBlockName)).data?.version || 0;
        let newVersion : number = (previousVersion + 1);
        this.setProgress(storageBlockName);
        let fileDirectory = await recursive(directoryPath);
        let directoryContent = [];
        let percentageTotal = 0;
        let percentagePart = (100/fileDirectory.length);
        for (let index = 0; index < fileDirectory.length; index++) {
            try{
                let name = fileDirectory[index].substr(fileDirectory[index].lastIndexOf("\\"));
                let content = await generic.fileLoad(fileDirectory[index]).then((contents)=>{
                    percentageTotal += percentagePart;
                    this.setProgress(storageBlockName, Math.round(percentageTotal));
                    return contents;
                });
                directoryContent.push({ path: fileDirectory[index].replace(name, ''), name: name.substr(("\\").length),  content : content.toString() });      
            } catch { 
                percentageTotal += percentagePart;
                this.setProgress(storageBlockName, Math.round(percentageTotal));
            } // Fail silently on bad files
        }
        this.setProgress(storageBlockName, 100);
        let response = await super.save(storageBlockName, { type: "dir", version: newVersion, path: directoryPath, files: directoryContent });
        if(response.status) await this.setVersion(storageBlockName, newVersion, 'both');
        if(clearDirectory) await this.removeDirectory(storageBlockName);
        return response;
    }

    /**
     * Create a new directory baed on a storage block
     * @param storageBlockName - Unique Storage block
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    public async load(storageBlockName: string, newLocation: string = null){
        try {
            this.setProgress(storageBlockName);
            let fileVersion : number =  await this.getVersion(storageBlockName, 'file');
            let systemTrackedFileVersion : number = await this.getVersion(storageBlockName, 'cache');
            if(systemTrackedFileVersion > fileVersion){
                let fileDirectory = await super.load(storageBlockName);
                fileDirectory.data = JSON.parse(fileDirectory.data);
                let files = fileDirectory.data.files;
                let thisPath = newLocation !== null ? newLocation : fileDirectory.data.path;
                
                if(fileDirectory.status){
                    if(Number(fileDirectory.data.version) > fileVersion){ // fallback version check
                        let percentageTotal = 0;
                        let percentagePart = (100/files.length);
                        for (let index = 0; index < files.length; index++) {
                            await generic.fileUpdate(files[index].path.replace(fileDirectory.data.path, thisPath), files[index].name, files[index].content).then(()=>{
                                percentageTotal += percentagePart;
                                this.setProgress(storageBlockName, Math.round(percentageTotal));
                            });
                        }
                        this.setProgress(storageBlockName, 100);
                        await this.setVersion(storageBlockName, Number(fileDirectory.data.version), 'both');
                        return response.success(`Directory ${thisPath} successfully loaded from storage block.`);
                    } else {
                        this.setProgress(storageBlockName, 100);
                        return response.failed(`Loaded version is greater, so we will not load the stored ${storageBlockName}.`);
                    }
                } else {
                    return response.failed(`Data storage block called ${storageBlockName} was found.`);
                }
            } else {
                this.setProgress(storageBlockName, 100);
                return response.failed(`Loaded version is greater, so we will not load the stored ${storageBlockName}.`);
            }
        } catch {
            return response.failed(`Data storage block ${storageBlockName} failed to load.`);
        }
    }

    /**
     * Sets the directory loading progress based on storage block name.
     * @param storageBlockName - Unique Storage block 
     */
    public setProgress(storageBlockName: string, progress: number = 0){
        let currentIndex = this.progressTracker.findIndex( elem => elem?.name === storageBlockName );
        if(currentIndex === -1){
            this.progressTracker.push({ name: storageBlockName, progress: progress });
        } else {
            this.progressTracker[currentIndex].progress = progress;
        } 
    }

    /**
     * Gets current loading progress based on the provided storage block name.
     * @param storageBlockName - Unique Storage block 
     * @returns percentage out of 100 that the directory has been loaded
     */
    public getProgress(storageBlockName: string){
        try {
            let currentIndex = this.progressTracker.findIndex( elem => elem?.name === storageBlockName );
            return currentIndex === -1 ? 0 : Math.round(Number(this.progressTracker[currentIndex].progress));
        } catch {
            return 0;
        }
    }

    /**
     * Get storage block path based on storage block id
     * @param storageBlockName 
     * @returns 
     */
    public async getDirectoryPath(storageBlockName: string){
        try{
            return response.success(`The ${storageBlockName} path was return successfully.`, JSON.parse((await super.load(storageBlockName)).data).path);
        } catch {
            return response.failed(`The ${storageBlockName} storage block doesn't exist.`);
        }
    }

    /**
     * Storage Block Directory - Get version from the pstore.version file inside the directory
     * @param storageBlockName - Storage block that
     * @param source - Which location are you checking [file, cache]
     * @return New version
     */
    public async getVersion(storageBlockName : string, source:string = 'file'){
        if(source === 'file'){ 
            let thisPath = (await this.getDirectoryPath(storageBlockName)).data;
            return await fs.existsSync(thisPath+"\\"+defaults.versionName) ? Number(await generic.fileLoad(thisPath+"\\"+defaults.versionName)) : 0;
        } else if (source === 'cache'){
            let version = await super.getCache(`${storageBlockName}:storageDirectoryVersion`);
            return version ? Number(version.value) : 0;
        }
    }

    /**
     * Storage Block not having
     * @param storageBlockName - Storage block that
     * @param version - Set a new version, if empty increment by 1
     * @param source - Which location are you checking [file, cache, both]
     * @return New version
     */
    public async setVersion(storageBlockName : string, version: number = null, source:string = 'file'){
        let thisPath = (await this.getDirectoryPath(storageBlockName)).data;
        let previousVersion : number  = 0;
        try{
            previousVersion = Number(await generic.fileLoad(thisPath+"\\"+defaults.versionName));
        } catch { } // Fail silently if you can't find bersion file
        let newVersion : string = version === null ? ( previousVersion + 1 ).toString() : version.toString();
        if(source === 'file' || source === 'both'){ 
            await generic.fileUpdate(thisPath, defaults.versionName, newVersion);
        }
        if (source === 'cache' || source === 'both'){
            await super.setCache(`${storageBlockName}:storageDirectoryVersion`, newVersion);
        }
        return Number(newVersion);
    }

    /**
     * Removes a directory and all files inside that directory based on storage block name.
     * @param storageBlockName - Name of the storage block
     */
    public async removeDirectory(storageBlockName:string){
        try {
            fs.rmSync((await this.getDirectoryPath(storageBlockName)).data, { recursive: true });
            return response.success("The storage block directory was deleted successfully.");
        } catch {
            return response.failed("The storage block directory failed to be deleted.");
        }
    }

    /**
     * Checks if a directory exists based on the provided storage block name.
     * @param storageBlockName - Name of the storage block
     */
    public async checkDirectory(storageBlockName: string){
        try {
            if(fs.existsSync((await this.getDirectoryPath(storageBlockName)).data)){
                return response.success("The storage block folder exists.");
            } else {
                return response.failed("The storage block folder does not exist.");
            }
        } catch {
            return response.failed("Failed to load corrupted storage block or you don't have the right access permissions");
        }
    }

}