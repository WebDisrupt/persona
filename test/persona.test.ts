import { persona } from '../src/index';
var fs = require("fs");

const username = "john@doe.com"; 
const password = "123456";
const path = "C:\\personas-test";

if(fs.existsSync(path)) fs.rmSync(path, { recursive: true }); // Remove left over data
let personaInstance = new persona({ appName: "default-app", path: path}); // Create new folder and system data

describe('Basic Persona Actions - Phased 1', () => {

    test("Check if Persona is not logged in", ()=>{
        expect(personaInstance.isLoggedIn().status).toBe(false);
    });

    test("Check username when Persona is not logged in", ()=>{
        expect(personaInstance.getUsername().status).toBe(false);
    });

    test("Create new Persona.", async ()=>{
        expect((await personaInstance.create(username, password)).status).toBe(true);
        await personaInstance.unload();
    });

    test("Load Persona.", async ()=>{
        expect((await personaInstance.load(username, password)).status).toBe(true);
        await personaInstance.delete(username, password);
    });

});
    
describe('Basic Persona Actions - Phased 2', () => {

    test("Add to previous and check that it will load with system data.", async ()=>{
        await personaInstance.create(username, password, 1);
        await personaInstance.unload();
        await personaInstance.load(username, password);
        await personaInstance.unload();
        expect((await personaInstance.systemLoad()).data.previous.username).toBe(username);
        await personaInstance.delete(username, password);
    });

    /*
    test("Check Saving Storage block without logged in Persona", async ()=>{
        let thisId = "example-data-block";
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        let saveblock = await personaInstance.module.storageBlock.save(thisId, thisContent);
        expect(saveblock.status).toBe(false);
    }); */

});   

describe('New Persona lifecycle for each test.', () => {

    beforeEach(() => {
        return personaInstance.create(username, password, 1);
    });
    afterEach(() => {
        return personaInstance.delete(username, password);
    });

    /// Persona Actions
    test("Create new Persona and load it", async ()=>{
        expect((await personaInstance.load(username, password)).status).toBe(true);
    });

    test("Get Persona id", ()=>{
        expect(personaInstance.getId().status).toBe(true);
    });

    test("Check if Persona is logged in", async ()=>{
        expect((await personaInstance.isLoggedIn()).status).toBe(true);
    });

    test("Check if Persona is logged out after unload", async ()=>{
        await personaInstance.unload();
        expect((await personaInstance.isLoggedIn()).status).toBe(false);
    });

    test("Update a Persona", async ()=>{
        expect((await personaInstance.save()).status).toBe(true);
    });

    test("Check recently loaded list.", async ()=>{
        let recentlyLoadedPersonas = personaInstance.getRecentList();
        expect(recentlyLoadedPersonas.data[0].username).toBe(username);
    }); 

    test("unload persona, check previous username.", async ()=>{
        expect((await personaInstance.unload()).status).toBe(true);
        expect((await personaInstance.systemLoad()).data.previous.username).toBe(username);
    });

    test("Delete a persona that dsoes exist", async ()=>{
        await personaInstance.delete(username, password);
        expect((await personaInstance.load(username, password)).status).toBe(false);
    });

    test("Delete a persona that doesn't exist", async ()=>{
        await personaInstance.delete(username, password);
        expect((await personaInstance.delete(username, password)).status).toBe(false);
    });

    test("Check saving and loading profile data", async ()=>{
        
        let profile = {
            avatar: "base64:34894ybf2304==",
            firstName: "john",
            lastName: "Doe",
            phone: "555-555-5555",
            email: username,
            age: new Date(1988, 8, 10),
            gender: "male",
            attributes: [ {key:"applicationKey1", value: "7777777777777" }, {key:"applicationKey1", value: "7777777777777" } ]
        };
        await personaInstance.saveProfile(profile);
        expect(personaInstance.getProfile().data).toBe(profile);
    });

    /// Persona Data Storage Actions
    test("Save and load a single data storage block.", async ()=>{
        let blockName = "example-data-block";
        let thisContent = { "data" : "The text you want to save" };
        // as string
        await personaInstance.module.storageBlock.save(blockName, JSON.stringify(thisContent));
        expect((await personaInstance.module.storageBlock.load(blockName)).data).toBe(JSON.stringify(thisContent));
        // as object
        await personaInstance.module.storageBlock.save(blockName+"2", thisContent);
        expect((await personaInstance.module.storageBlock.load(blockName)).data).toBe(JSON.stringify(thisContent));
    });

    test("Update a single data storage block.", async ()=>{
        let thisId = "example-data-block";
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        let thisContent2 = JSON.stringify({ "data" : "The text you want to save 2" });
        await personaInstance.module.storageBlock.save(thisId, thisContent);
        expect((await personaInstance.module.storageBlock.save(thisId, thisContent2)).status).toBe(true);
        expect((await personaInstance.module.storageBlock.load(thisId)).data).toBe(thisContent2);
        expect((await personaInstance.module.storageBlock.getList()).data.length).toBe(1);
    });

    test("Delete a data storage block(s)", async ()=>{
        let thisId = "example-data-block";
        let thisId2 = "example-data-block2";
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        await personaInstance.module.storageBlock.save(thisId, thisContent);
        expect((await personaInstance.module.storageBlock.delete(thisId)).status).toBe(true);
        await personaInstance.module.storageBlock.save(thisId, thisContent);
        await personaInstance.module.storageBlock.save(thisId2, thisContent);
        expect((await personaInstance.module.storageBlock.delete()).status).toBe(true);
    });

    test("Load multiple data storage blocks mapped while perserving the previous data", async ()=>{
        let defaultObject = {
            exampleDataBlock : { "data" : "nothing loaded" },
            exampleDataBlock2 : { "data" : "nothing loaded" },
            exampleDataBlock3 : { "data" : "Wasn't JSON loaded" },
            exampleDataBlock4 : { "data" : "defaulted" }
        };
        let defaultObjectKeys = Object.keys(defaultObject);
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        await personaInstance.module.storageBlock.save(defaultObjectKeys[0], thisContent);
        await personaInstance.module.storageBlock.save(defaultObjectKeys[1], thisContent);
        await personaInstance.module.storageBlock.save(defaultObjectKeys[2], "Sorry but this wasn't json, so load it as a string");
        let defaultObjectmocked : any = defaultObject;
        defaultObjectmocked[defaultObjectKeys[0]] = JSON.parse(thisContent);
        defaultObjectmocked[defaultObjectKeys[1]] = JSON.parse(thisContent);
        defaultObjectmocked[defaultObjectKeys[2]] = "Sorry but this wasn't json, so load it as a string";
        expect((await personaInstance.module.storageBlock.loadAll(defaultObject)).data).toStrictEqual(defaultObjectmocked);
        expect((await personaInstance.module.storageBlock.delete()).status).toBe(true);
    });

});


// Unload - Removes directory to test creating a new one on next run
afterAll(() => {
    return fs.rmSync(path, { recursive: true });
});


