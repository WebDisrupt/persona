


import { StorageBlockDirectory } from '../src/modules/storage-block-directory'

const username = "john@doe.com"; 
const password = "123456";
const key = password + username;
const path = "C:\\personas-test-storage-block-directory";
const path2 = "C:\\personas-test-storage-block-directory-2";
const appName = "app-example-domain-com";
let storageBlockDirectory: StorageBlockDirectory = new StorageBlockDirectory(
{ appName: appName, personaId: "test-storage-block-module", path: path, key: key }
);
const dirStorageBlock = "example-data-directory";
const mockedDirectory = "C:\\personas-test-directory-module";
const mockedFiles = ["test_1.json", "test_2.txt", "test_3.exe" , "test_4.png"];
const mockedFileAddtion = "test.cache";

var fs = require("fs");

var clearAllDirectories = function(){
    if(fs.existsSync(path)) fs.rmdirSync(path, { recursive: true }); 
    if(fs.existsSync(path2)) fs.rmdirSync(path2, { recursive: true });
    if(fs.existsSync(mockedDirectory)) fs.rmdirSync(mockedDirectory, { recursive: true }); // Remove left over data
}

clearAllDirectories();

// Create a mocked directory for testing
fs.mkdirSync(mockedDirectory, { recursive: true });
for (let index = 0; index < mockedFiles.length; index++) {
    fs.writeFileSync(`${mockedDirectory}\\${mockedFiles[index]}`, "");
}

describe('Storage Block Directory Module', () => {

    test("Load from a storage block that doesn't exist.", async ()=>{
        expect((await storageBlockDirectory.dirLoad(dirStorageBlock)).status).toBe(false);
    });

    test("Check if a directory exists.", async ()=>{
        expect(!(await storageBlockDirectory.dirExists(dirStorageBlock)).status).toBe(true);
    });
    
    test("Save a direrctory to a storage block.", async ()=>{
        expect((await storageBlockDirectory.dirSave(mockedDirectory, dirStorageBlock)).status).toBe(true);
    });

    test("Check the getter and setter for directory file versioning.", async ()=>{
        expect((await storageBlockDirectory.getVersionFile(dirStorageBlock))).toBe(1);
        expect((await storageBlockDirectory.setVersionFile(dirStorageBlock))).toBe(2);
        expect((await storageBlockDirectory.setVersionFile(dirStorageBlock))).toBe(3);
    });

   test("Check loading stale content using directory file versioning.", async ()=>{
        await storageBlockDirectory.dirSave(mockedDirectory, dirStorageBlock);
        await storageBlockDirectory.setVersionFile(dirStorageBlock, 1);
        expect((await storageBlockDirectory.dirLoad(dirStorageBlock)).status).toBe(false);
    });

    test("Remove a specified directory.", async ()=>{
        expect((await storageBlockDirectory.dirRemove(dirStorageBlock)).status).toBe(true);
        expect((await storageBlockDirectory.dirExists(dirStorageBlock)).status).toBe(false);
    });

    test("Remove a specified directory for a storage block that doesn't exist.", async ()=>{
        expect((await storageBlockDirectory.dirRemove(dirStorageBlock+"-bad-name")).status).toBe(false);
    });

    test("Load a storage block", async ()=>{ 
        expect((await storageBlockDirectory.dirLoad(dirStorageBlock)).status).toBe(true);
        expect((await storageBlockDirectory.dirExists(dirStorageBlock)).status).toBe(true);
    });

});

// Unload - Removes directory to test creating a new one on next run
afterAll(() => {
    return clearAllDirectories();
});