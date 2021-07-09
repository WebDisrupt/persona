import { hashStrength } from './models/hash-strength';
import { personaSeed } from './models/persona-root';
export { hashStrength, hashStrengthDetails } from './models/hash-strength';
export { personaRoot, personaSeed } from './models/persona-root';
export { personaHelpers } from './modules/helpers';
export interface personaOptions {
    appName?: string;
    path?: string;
    previous?: string;
    recentList?: Array<personaSeed>;
}
export declare class persona {
    private readonly root;
    private readonly ext;
    private appName;
    private path;
    private recentList;
    private current;
    private username;
    private password;
    constructor(options?: personaOptions);
    discovery(): string;
    isLoggedIn(): boolean;
    switch(username: string, password: string): void;
    private find;
    getRecentList(): personaSeed[];
    addRecentListItem(recentlyLoadedPersona: personaSeed): void;
    unload(): {
        status: boolean;
        message: string;
        data: string;
    };
    load(username?: string, password?: string, dataMap?: Array<string>): Promise<boolean>;
    delete(username?: string, password?: string): Promise<boolean>;
    create(username: string, password: string, strength?: hashStrength): Promise<any>;
    save(): Promise<any>;
    private updateFile;
    private asyncSome;
    private asyncFind;
    private loadFile;
    private generatePersonaId;
    private generateStorageId;
    loadStorageBlock(dataId: string): Promise<{
        status: boolean;
        message: string;
        data: string;
    }>;
    saveStorageBlock(dataId: string, content: string): Promise<{
        status: boolean;
        message: string;
    }>;
    private setDataBlockID;
    private createStorageBlock;
    private updateStorageBlock;
    deleteStorageBlock(dataId?: string): Promise<{
        status: boolean;
        message: string;
    }>;
}
