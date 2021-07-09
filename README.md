

# Persona ![Build](https://img.shields.io/github/package-json/v/WebDisrupt/persona/master?label=Stable%20Version) ![coverage](https://img.shields.io/badge/coverage-81.25%25-green) 
Store local data in a secure data vault. The persona system allows you to create a profile which can flexibly store any data. The idea is that no one can access that data unless know the username and master password. The master password and username is used as the private key to unlock your data.

This library uses a combination of Argon2id hashing and AES 256 encryption which is very much infeasible to crack with current technology. This library was created so that people can encrypt their data and avoiding all data mining opperations done by malicious software and big tech. Keep your data safe with ease. 


## Installation 

You can install via NPM
```
npm i @webdisrupt/persona --save
```


## Getting started
Once installed, you will need to import the package and create a new instance. Each instance can house a single logged in persona. The persona will handle all the saving and and loading of data and abstract it to simple functions.

```javascript

import { persona } from 'persona';

let persona = new persona({ 
        appName : "my-app-whereyoucanfindit-com",
        path : "C:\\custom\personas";
        recentlyLoaded : [],
        previous : {}
    });

```

## persona options
Although none of these parameters are technically required, we do reccommend at a bare minimium using the **appName** to help scope your data.
- **appName**: This should represent your application name and is used for scoping data. So you might want to make it a very long unique name.
- **path**: The default path is "C:\\personas". You can change this, but know that it will not detect their previous profile information. So it is not recommended to change this yourself, but instead allow the end-user to change instead.
- **RecentlyLoaded**: A minimal object referencing previously loaded profiles. There is no saving implemented for this yet, so you will have to save it yourself and pass it in on every new instance. Contains a list of { id: "string", username: "string", avatar: "Base64" }.
- **pervious**: Last loaded persona for quick reference on subsequent ussage.

## API

**Create**
Creating a new persona is as easy as calling the following function on the new instance you created.

```javascript
persona.create("john@doe.com", "123456", 1);
```

**Load**
Creating a new persona is as easy as calling the following function on the new instance you created. You can leave blank if persona has already been loaded once or the create was just called.

```javascript
persona.load("john@doe.com", "123456");
```

**Delete**
Deletes a persona. You can optionally target a persona that isn't loaded by providing a valid username or password.
```javascript
persona.delete();
```


**TODO** - More documentation coming soon.