

# Persona ![Build](https://img.shields.io/github/package-json/v/WebDisrupt/persona/master?label=Stable%20Version) ![coverage](https://img.shields.io/badge/coverage-93.47%25-green)
Store local data in a secure data vault. The persona system allows you to create a profile which can flexibly store any data. The idea is that no one can access that data unless know the username and master password. The master password and username is used as the private key to unlock your data.

This library uses a combination of Argon2id hashing and AES 256 encryption which is very much infeasible to crack with current technology. This library was created so that people can encrypt their data and avoiding all data mining opperations done by malicious software and big tech. Keep your data safe with ease. 


## Installation 

You can install via NPM or download from GitHub.
```
npm i @webdisrupt/persona
```

## Getting Started
Once installed, you will need to import the package and create a new instance. Each instance can house a single logged in persona. The persona will handle all the saving and and loading of data and abstract it to high level functions.

```javascript

import { persona } from 'persona';

let persona = new persona({ 
        appName : "my-app-whereyoucanfindit-com",
        path : "C:\\custom\personas";
        recentlyLoaded : [],
        previous : {}
    });

```


### Persona Options
Although none of these parameters are technically required, we do reccommend at a bare minimium using the **appName** to help scope your data.
- **appName**: This should represent your application name and is used for scoping data. So you might want to make it a very long unique name.
- **path**: The default path is "C:\\personas". You can change this, but know that it will not detect their previous profile information. So it is not recommended to change this yourself, but instead allow the end-user to change instead.
- **RecentlyLoaded**: A minimal object referencing previously loaded profiles. There is no saving implemented for this yet, so you will have to save it yourself and pass it in on every new instance. If not provided it will load from the system.persona file.
**Persona Seed Model**
```javascript
{ 
    id: "string", 
    username: "string", 
    avatar: "Base64", 
    location: "file location" 
}
```
- **pervious**: Last loaded persona for quick reference on subsequent ussage. If not provided it will load from the system.persona file.

## Upgrade from version 1 to 2
Some massive changes have happened in version 2.0. The qaulity and mantainability have been reimagined. The only noticable usability change is that storage block and directory storage block functionality is now located under the module object with more standardized names.


## Response Model
All function calls have a standardized response object. It contains a status which provides a bool on success or failure. The second property is a user friendly message on what happened. The last is an optional data property that contians any data requested.

**Standard response object model**
```javascript
{status: boolean, message: string, data:any}
```

## Persona Root

The persona root file is the core of the persona system and contains various standardized information. This file is json and contain a couple different encrypted pieces of data. This data can be unlocked and is the core of the persona system. It also stores all references to the data storage block which hold application specific information.

### **Create Persona**
Creating a new persona and starts referencing it in your session.
Essentially the same as creating a new account.
```javascript
persona.create("username", "password", 1);
```

### **Load Persona**
Loads an exisitng Persona and starts referencing it in your session. Essentially the same as logging in.
```javascript
persona.load("username", "password");
```

### **Save Persona**
Saves the persona that is currently referenced.
```javascript
persona.save();
```

### **Delete Persona**
 Deletes the currently referenced persona.
```javascript
persona.delete();
```

### **Unload Persona**
Unloads the currently referenced persona. Essentially the same as logging out.
```javascript
persona.unload();
```

### **Get Recently loaded Personas**
Get all recently loaded profiles. This list is updated along with the previous user, on user login. (persona.load())
```javascript
persona.getRecentList();
```

### **Check if user is loggedIn**
Check whether user is logged in. Additionally returns previously used simplified login data. See the **Persona Seed Model**.
```javascript
persona.isLoggedIn()
```

### **Get persona profile details.**
 Returns the loggedIn user's profile details. Note these are optional. See the **Profile Model**.
```javascript
persona.getProfile()
```
**Profile Model**
```javascript
    avatar?: string,
    firstName?: string,
    lastName?: string,
    phone?: string,
    email?: string,
    age?: Date,
    gender?: string,
    attributes?:Array<profileAttribute> // Profile Attribute is just a simple key value pair.
```

### **Save persona profile details.**
 Saves the loggedIn user's profile details. See the **Profile Model**.
```javascript
persona.saveProfile()
```

## Module - Storage Blocks

What are Perona data storage blocks? A chunk of data that can take any format and has been secured using AES 256 encryption. Each block contains a unique id that is referenced by the root file. Each block contains a randomly generated file id so it cannot be identified. The id is structured as radnomFilename|uniqueApplicationName|uniqueDataBlockName. Please make your unique application name very unique to avoid collissions with other applications. This reference will be stored in your persona.root file and can be referenced after intial login is performed. 


### **Save Data Storage Block**
Saves a block of data to an existing block or creates a new block based on the application id & save sotrage id.
```javascript
persona.module.storageBlock.save("unique-id-string", "Whatever format or data you want to save.")
```

### **Load Data Storage Block**
Loads a block of data from an existing block.
```javascript
persona.module.storageBlock.load("unique-id-string");
```

### **Load Data Storage Blocks**
Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding object property. If the property is not found, then it assigns the previous data.
```javascript
let dataObject = { 
    block1: { prop1: "...", prop2: "..." },
    block2: { prop1: "...", prop2: "..." },
    block3: ["", "", ""]
}
persona.module.storageBlock.loadAll(dataObject);
```

### **Delete Data Storage Block**
Deletes a storage block.
```javascript
persona.module.storageBlock.delete("unique-id-string");
```

### **Delete Data Storage Block**
Gets all the storage block that are defined inside the current Persona.
```javascript
persona.module.storageBlock.getList();
```


## Module - Storage blocks Directory

### **Save a directory to a Data Storage Block**
Saves a directory to a data storage block. This allows you to protect entire folders. Use the last argument tells this function whether to clear this directory after it is saved. The third argument is optional.
```javascript
persona.module.storageBlockDirectory.save("directory/path", "unique-id-string", true);
```

### **Load a directory from a Data Storage Block**
Creates a directory from loading a data storage block. This allows you to protect entire folders.
```javascript
persona.module.storageBlockDirectory.load("unique-id-string");
```

### **This will be updated as directory is being loaded or saved**
Gets current load/save progress based on the provided storage block name.
```javascript
persona.module.storageBlockDirectory.getProgress("unique-id-string");
```

### **Removes a directory**
Removes a directory and all files inside that directory based on storage block name.
```javascript
persona.module.storageBlockDirectory.removeDirectory("unique-id-string");
```

### **Checks if a directory exists**
Checks if a directory exists only using the current storage block name.
```javascript
persona.module.storageBlockDirectory.checkDirectory("unique-id-string");
```

### **Set the version number of a directory**
Marks a directory to a specific version. If a number is not provided it will increment the current known version. This tells the system if there has been any content changes to that directory. This is stored encrypted in a storage block and also as a pstore.version file. This function only updates the pstore.version file.
```javascript
persona.module.storageBlockDirectory.setVersion("unique-id-string", ?Number);
```

### **Checks if a directory exists**
Gets the current file version from the directories pstore.version file.
```javascript
persona.module.storageBlockDirectory.getVersion("unique-id-string");
```

## The Future
I am looking to expand this library and create a way to sync data with cloud providers, peer to other devices, or self hosting. Thus creating a way to store your data as you would with a cloud provider but with them not being able to view or tamper with your data.

## Contribution
I would also like to increase redundancy, security, and add other cool features. If this sounds exciting and you would like to help then please don't hesitate to reach out to me. team@webdisrupt.com