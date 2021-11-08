import { StorageBlock } from '../modules/storage-block';
import { StorageBlockDirectory } from '../modules/storage-block-directory';

export interface moduleOptions {
    path : string,
    appName : string,
    personaId : string,
    key : string
}

export interface modules {
    storageBlock: StorageBlock,
    storageBlockDirectory: StorageBlockDirectory
}