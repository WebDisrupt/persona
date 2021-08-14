import { persona } from '../src/index';
var fs = require("fs");

// TODO change the persona root calls to add correct response 
// Add multi-storage loading function

const username = "john@doe.com"; 
const password = "123456";
const path = "C:\\personas-test";

let personaInstance = new persona({ appName: "default-app", path: path});

describe('No looping actions', () => {

    test("Check if Persona is not logged in", ()=>{
        expect(personaInstance.isLoggedIn().status).toBe(false);
    });

    test("Add to previous and check that it will load with system data.", async ()=>{


        await personaInstance.create(username, password, 1);
        personaInstance.unload();
        await personaInstance.load(username, password);
        personaInstance.unload();
        let systemData = await personaInstance.systemLoad();
        expect(systemData.data.previous.username).toBe(username);
        await personaInstance.delete(username, password);
    });

});


describe('Persona Create and Delete Cycle.', () => {

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

    test("unload persona", async ()=>{
        expect((await personaInstance.unload()).status).toBe(true);
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
        let thisId = "example-data-block";
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        await personaInstance.saveStorageBlock(thisId, thisContent);
        expect((await personaInstance.loadStorageBlock(thisId)).data).toBe(thisContent);
    });

    test("Update a single data storage block.", async ()=>{
        let thisId = "example-data-block";
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        let thisContent2 = JSON.stringify({ "data" : "The text you want to save 2" });
        await personaInstance.saveStorageBlock(thisId, thisContent);
        expect((await personaInstance.saveStorageBlock(thisId, thisContent2)).status).toBe(true);
        expect((await personaInstance.loadStorageBlock(thisId)).data).toBe(thisContent2);
    });

    test("Delete a data storage block(s)", async ()=>{
        let thisId = "example-data-block";
        let thisId2 = "example-data-block2";
        let thisContent = JSON.stringify({ "data" : "The text you want to save" });
        await personaInstance.saveStorageBlock(thisId, thisContent);
        expect((await personaInstance.deleteStorageBlock(thisId)).status).toBe(true);
        await personaInstance.saveStorageBlock(thisId, thisContent);
        await personaInstance.saveStorageBlock(thisId2, thisContent);
        expect((await personaInstance.deleteStorageBlock()).status).toBe(true);
    });

});

// Unload - Removes directory to test creating a new one on next run
afterAll(() => {
    return fs.rmdirSync(path, { recursive: true });
});
  

