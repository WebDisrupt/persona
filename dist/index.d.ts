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
    constructor(options?: personaOptions);
    isLoggedIn(): {
        status: boolean;
        message: string;
        data: any;
    };
    getUsername(): {
        status: boolean;
        message: string;
        data: any;
    };
    getProfile(): {
        status: boolean;
        message: string;
        data: any;
    };
    saveProfile(newProfile: profile): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    switch(username: string, password: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    getRecentList(): {
        status: boolean;
        message: string;
        data: any;
    };
    private addRecentListItem;
    systemLoad(): {
        status: boolean;
        message: string;
        data: any;
    };
    systemSave(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    unload(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    load(username?: string, password?: string, dataMap?: Array<string>): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    delete(username?: string, password?: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    create(username: string, password: string, strength?: hashStrength): Promise<any>;
    save(): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    loadStorageBlocks(dataIdMap: Array<string>): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    loadStorageBlock(dataId: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    saveStorageBlock(dataId: string, content: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    deleteStorageBlock(dataId?: string): Promise<{
        status: boolean;
        message: string;
        data: any;
    }>;
    private find;
    private updateFile;
    private asyncSome;
    private asyncFind;
    private loadFile;
    private generatePersonaId;
    private generateStorageId;
    private setDataBlockID;
    private createStorageBlock;
    private updateStorageBlock;
}
