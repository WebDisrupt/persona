


import { StorageBlock } from '../src/modules/storage-block'

const username = "john@doe.com"; 
const password = "123456";
const key = password;
const path = "C:\\personas-test-storage-block";
const appName = "app-example-domain-com";
let storageBlock: StorageBlock = new StorageBlock(
{ appName: appName, personaId: "test-storage-block-module", path: path, key: key }
);
let blockName = "example-data-block";
let blockName2 = "example-data-block-2";
let thisContent = { "data" : "The text you want to save" };
var fs = require("fs");
if(fs.existsSync(path)) fs.rmSync(path, { recursive: true }); // Remove left over data

describe('Storage Block Module', () => {
    test("Save a <string> to a single data storage block.", async ()=>{
        expect((await storageBlock.save(blockName, JSON.stringify(thisContent))).status).toBe(true);
    });
    test("Load a <string> to a single data storage block.", async ()=>{
        expect((await storageBlock.load(blockName)).data).toBe(JSON.stringify(thisContent));
    });
    test("Save an <object> to a single data storage block.", async ()=>{
        expect((await storageBlock.save(blockName2, thisContent)).status).toBe(true);
    });
    test("Load an <object> to a single data storage block.", async ()=>{
        expect((await storageBlock.load(blockName2)).data).toBe(JSON.stringify(thisContent));
    });

});

// Unload - Removes directory to test creating a new one on next run
afterAll(() => {
    return fs.rmSync(path, { recursive: true });
});