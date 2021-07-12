import { hashStrength } from './hash-strength';
export interface personaRoot {
    id: string, // Identifier which can be used to reference profile, only has to be locally unique for now.
    username: string, // Username encrypted with username/password.
    password: string, // Password encrypted with username/password.
    strength: hashStrength, // Strength value that controls speed at which attempts can be made.
    profile: string, // Personal information encrypted by password/username. Also checked wether its decrypted will validate username/password is correct.
    recovery: string, // 32 character one-time generated GUID that will encrypt username/password. Can be used for unlocking account if you forget username and password.
    mfa: string, // (Not Implemented) String that will get delimited to provide additional security method:version
    link: Array<string> // Links to external data [ "encrypt(block-pupose):GUID.block" ]
}

export interface personaSeed {
    id?: string, // Identifier which can be used to reference profile, onlt has to be locally unique for now.
    username?: string, // Username encrypted with username/password.
    avatar?: string, // Base 64 string
    location?: string // Path to where the persona is stored, might be different than default
}

export interface personaOptions { 
    appName?:string, // A unique ID that represents your application
    path?:string, // A default path where personas are stored
    previous?: personaSeed, // The most recently logged in user
    recentList?:Array<personaSeed> // A list of all rcently logged in users
}