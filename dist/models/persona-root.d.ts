import { hashStrength } from './hash-strength';
export interface personaRoot {
    id: string;
    username: string;
    password: string;
    strength: hashStrength;
    profile: string;
    recovery: string;
    mfa: string;
    link: Array<string>;
}
export interface personaSeed {
    id?: string;
    username?: string;
    avatar?: string;
    location?: string;
}
export interface personaOptions {
    appName?: string;
    path?: string;
    previous?: personaSeed;
    recentList?: Array<personaSeed>;
}
