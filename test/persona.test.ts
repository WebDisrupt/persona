import { persona } from '../src/index';
var fs = require("fs");

// TODO change the persona root calls to add correct response 
// Add multi-storage loading function

const username = "john@doe.com"; 
const password = "123456";
const path = "C:\\personas-test";
fs.rmdirSync(path, { recursive: true }); // Removes directory to test creating a new one
let personaInstance = new persona({ appName: "default-app", path: path});

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


// TODO Save profile 

// TODO Get profile 


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

//fs.rmdirSync(path, { recursive: true }); // Removes directory to test creating a new one