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
export interface profile {
    avatar?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    email?: string;
    age?: Date;
    gender?: string;
}
export interface personaSeed {
    id?: string;
    username?: string;
    avatar?: string;
}
