"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.persona = exports.hashStrengthDetails = exports.hashStrength = void 0;
var hash_strength_1 = require("./models/hash-strength");
exports.hashStrength = hash_strength_1.hashStrength;
exports.hashStrengthDetails = hash_strength_1.hashStrengthDetails;
var cypher_1 = require("./modules/cypher");
var response_1 = require("./modules/response");
var uuid = require('uuid-random');
var fs = require("fs");
var path = require("path");
var persona = (function () {
    function persona(options) {
        var _this = this;
        if (options === void 0) { options = null; }
        var _a;
        this.root = "root";
        this.ext = ".persona";
        this.blockExt = ".pstore";
        this.system = "system";
        this.appName = "default";
        this.path = "C:\\personas";
        this.current = null;
        this.recentList = [];
        this.previous = null;
        this.profile = null;
        this.username = null;
        this.password = null;
        this.asyncSome = function (arr, predicate) { return __awaiter(_this, void 0, void 0, function () {
            var _i, arr_1, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, arr_1 = arr;
                        _a.label = 1;
                    case 1:
                        if (!(_i < arr_1.length)) return [3, 4];
                        e = arr_1[_i];
                        return [4, predicate(e)];
                    case 2:
                        if (_a.sent())
                            return [2, true];
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, false];
                }
            });
        }); };
        this.asyncFind = function (arr, predicate) { return __awaiter(_this, void 0, void 0, function () {
            var _i, arr_2, e;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _i = 0, arr_2 = arr;
                        _a.label = 1;
                    case 1:
                        if (!(_i < arr_2.length)) return [3, 4];
                        e = arr_2[_i];
                        return [4, predicate(e)];
                    case 2:
                        if (_a.sent())
                            return [2, e];
                        _a.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4: return [2, null];
                }
            });
        }); };
        if ((options === null || options === void 0 ? void 0 : options.path) !== undefined)
            this.path = options.path;
        if ((options === null || options === void 0 ? void 0 : options.recentList) !== undefined)
            this.recentList = options.recentList;
        if ((options === null || options === void 0 ? void 0 : options.previous) !== undefined) {
            this.username = options.previous.username;
            this.previous = options.previous;
        }
        if ((options === null || options === void 0 ? void 0 : options.appName) !== undefined)
            this.appName = options.appName;
        var systemData = this.systemLoad();
        if (systemData.status) {
            if ((options === null || options === void 0 ? void 0 : options.recentList) === undefined || (options === null || options === void 0 ? void 0 : options.recentList) === null) {
                this.recentList = systemData.data.recentList;
            }
            if ((options === null || options === void 0 ? void 0 : options.previous) === undefined || (options === null || options === void 0 ? void 0 : options.previous) === null) {
                this.username = ((_a = systemData.data.previous) === null || _a === void 0 ? void 0 : _a.username) || null;
                this.previous = systemData.data.previous;
            }
        }
        if (!fs.existsSync(this.path))
            fs.mkdirSync(this.path, { recursive: true });
    }
    persona.prototype.isLoggedIn = function () {
        return this.username != null && this.password != null ? response_1.response.success(this.username + " is currently logged in") :
            this.previous !== null ? response_1.response.failed(this.previous.username + " is not currently logged in.", this.previous) : response_1.response.failed("No user is currently logged in.", null);
    };
    persona.prototype.getUsername = function () {
        return this.username != null ? response_1.response.success(this.username + " was found.", this.username) :
            this.previous !== null ? response_1.response.failed(this.previous.username + " is not currently logged in.") : response_1.response.failed("No user is currently logged in.");
    };
    persona.prototype.getProfile = function () {
        return this.profile === null ? response_1.response.failed("No current profile exists.") : response_1.response.success(this.username + "'s profile has been loaded successfully.", this.profile);
    };
    persona.prototype.saveProfile = function (newProfile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.username === null || this.password === null)
                            return [2, response_1.response.failed("No current profile exists.")];
                        this.profile = newProfile;
                        this.current.profile = cypher_1.cypher.encrypt(JSON.stringify(newProfile), this.password + this.username);
                        return [4, this.save()];
                    case 1:
                        _a.sent();
                        return [2, response_1.response.success(this.username + "'s profile was saved successfully.")];
                }
            });
        });
    };
    persona.prototype["switch"] = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.unload()];
                    case 1:
                        _a.sent();
                        this.username = username;
                        this.username = password;
                        return [2, this.load()];
                }
            });
        });
    };
    persona.prototype.getRecentList = function () {
        return this.recentList !== null ? response_1.response.success("Success, " + this.recentList.length + " Prsonas found.", this.recentList) : response_1.response.failed("Could not find any recently loaded Prsonas.");
    };
    persona.prototype.addRecentListItem = function (recentlyLoadedPersona) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!this.recentList.includes(recentlyLoadedPersona)) return [3, 2];
                        this.recentList.push(recentlyLoadedPersona);
                        return [4, this.systemSave()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2];
                }
            });
        });
    };
    persona.prototype.systemLoad = function () {
        var filename = this.path + "\\" + this.system + this.ext;
        if (fs.existsSync(filename)) {
            var systemData = fs.readFileSync(filename);
            return response_1.response.success("System data was loaded successfully.", JSON.parse(systemData));
        }
        else {
            return response_1.response.failed("Failed to load System data.");
        }
    };
    persona.prototype.systemSave = function () {
        return __awaiter(this, void 0, void 0, function () {
            var systemData, wasSaved;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        systemData = {
                            previous: this.previous,
                            recentList: this.recentList
                        };
                        return [4, this.updateFile(this.path, "" + this.system + this.ext, JSON.stringify(systemData))];
                    case 1:
                        wasSaved = _a.sent();
                        return [2, wasSaved ? response_1.response.success("System data was saved successfully.") : response_1.response.failed("Failed to save system data.")];
                }
            });
        });
    };
    persona.prototype.unload = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.current === null)
                            return [2, response_1.response.failed("Persona cannot be unloaded because no Persona loaded.")];
                        this.previous = {
                            id: this.current.id,
                            username: this.username,
                            avatar: ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.avatar) != null ? this.profile.avatar : null
                        };
                        return [4, this.systemSave()];
                    case 1:
                        _b.sent();
                        this.current = null;
                        this.username = null;
                        this.password = null;
                        this.profile = null;
                        return [2, response_1.response.success("Successfully logged out of the Persona " + this.previous.username + ".")];
                }
            });
        });
    };
    persona.prototype.load = function (username, password, dataMap) {
        if (username === void 0) { username = null; }
        if (password === void 0) { password = null; }
        if (dataMap === void 0) { dataMap = null; }
        return __awaiter(this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.username !== username && this.password !== password)) return [3, 2];
                        return [4, this.unload()];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2:
                        username = username === null ? this.username : username;
                        password = password === null ? this.password : password;
                        return [4, this.find(username, password)];
                    case 3:
                        id = _a.sent();
                        if (!(id !== null)) return [3, 5];
                        return [4, this.loadFile(this.path + "\\" + id + "\\" + this.root + this.ext).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                var persona, _a, _b, _c, _d;
                                return __generator(this, function (_e) {
                                    switch (_e.label) {
                                        case 0:
                                            persona = JSON.parse(content);
                                            return [4, cypher_1.cypher.verify(password + username, persona.password)];
                                        case 1:
                                            if (!_e.sent()) return [3, 5];
                                            this.password = password;
                                            this.username = username;
                                            this.current = persona;
                                            this.profile = JSON.parse(cypher_1.cypher.decrypt(persona.profile, password + username));
                                            _b = (_a = response_1.response).success;
                                            _c = [username + ", Welcome back."];
                                            if (!(dataMap !== null)) return [3, 3];
                                            return [4, this.loadStorageBlocks(dataMap)];
                                        case 2:
                                            _d = (_e.sent()).data;
                                            return [3, 4];
                                        case 3:
                                            _d = null;
                                            _e.label = 4;
                                        case 4: return [2, _b.apply(_a, _c.concat([_d]))];
                                        case 5: return [2, response_1.response.failed("The username or password is incorrect.")];
                                    }
                                });
                            }); })];
                    case 4: return [2, _a.sent()];
                    case 5: return [2, response_1.response.failed("The username or password is incorrect.")];
                }
            });
        });
    };
    persona.prototype["delete"] = function (username, password) {
        if (username === void 0) { username = null; }
        if (password === void 0) { password = null; }
        return __awaiter(this, void 0, void 0, function () {
            var id, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        username = username === null ? this.username : username;
                        password = password === null ? this.password : password;
                        return [4, this.find(username, password)];
                    case 1:
                        id = _b.sent();
                        if (!(id !== null)) return [3, 7];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4, fs.rmdirSync(this.path + "\\" + id, { recursive: true })];
                    case 3:
                        _b.sent();
                        return [4, this.unload()];
                    case 4:
                        _b.sent();
                        return [2, response_1.response.success(username + "'s Persona has been deleted.")];
                    case 5:
                        _a = _b.sent();
                        return [2, response_1.response.failed("Something failed when deleting this Persona.")];
                    case 6: return [3, 8];
                    case 7: return [2, response_1.response.failed("Could not find a valid Persona or it has already been deleted.")];
                    case 8: return [2];
                }
            });
        });
    };
    persona.prototype.create = function (username, password, strength) {
        if (strength === void 0) { strength = hash_strength_1.hashStrength.medium; }
        return __awaiter(this, void 0, void 0, function () {
            var checkIfPersonaExists, newID, recoveryId, location, key;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.unload()];
                    case 1:
                        _a.sent();
                        return [4, this.find(username, password)];
                    case 2:
                        checkIfPersonaExists = _a.sent();
                        if (checkIfPersonaExists !== null)
                            return [2, response_1.response.failed("Persona " + username + " already exists, please select a different username.")];
                        return [4, this.generatePersonaId().then(function (id) { return id; })];
                    case 3:
                        newID = _a.sent();
                        recoveryId = cypher_1.cypher.generateRecoveryCode();
                        location = this.path + "\\" + newID;
                        key = password + username;
                        return [4, cypher_1.cypher.hash(key, Number(strength.toString())).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
                                var newProfile, newRes;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            newProfile = {
                                                id: newID,
                                                username: cypher_1.cypher.encrypt(username, key),
                                                password: hash,
                                                strength: strength,
                                                profile: cypher_1.cypher.encrypt("{\"firstName\":\"\", \"lastName\":\"\"}", key),
                                                mfa: "none",
                                                recovery: cypher_1.cypher.encrypt(key, recoveryId),
                                                link: []
                                            };
                                            this.username = username;
                                            this.password = password;
                                            this.current = newProfile;
                                            return [4, this.addRecentListItem({ id: newID, username: username, avatar: null, location: location })];
                                        case 1:
                                            _a.sent();
                                            return [4, this.updateFile(location, "" + this.root + this.ext, JSON.stringify(newProfile))];
                                        case 2:
                                            newRes = _a.sent();
                                            return [2, newRes ? response_1.response.success("Persona " + this.username + " successfully created.", recoveryId) : response_1.response.failed("Persona " + this.username + " failed to be created. Please check folder permissions.")];
                                    }
                                });
                            }); })];
                    case 4: return [2, _a.sent()];
                }
            });
        });
    };
    persona.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.current !== null && this.username !== null && this.password !== null)) return [3, 2];
                        return [4, this.updateFile(this.path + "\\" + this.current.id, "" + this.root + this.ext, JSON.stringify(this.current))];
                    case 1:
                        newRes = _a.sent();
                        return [2, newRes ? response_1.response.success("Persona " + this.username + " successfully created.") : response_1.response.failed("Persona " + this.username + " failed to be created. Please check folder permissions.")];
                    case 2: return [2, response_1.response.failed('Persona failed to be saved. No Persona is active.')];
                }
            });
        });
    };
    persona.prototype.loadStorageBlocks = function (dataIdMap) {
        return __awaiter(this, void 0, void 0, function () {
            var collection, _a, _b, _i, dataId, item;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = [];
                        for (_b in dataIdMap)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3, 4];
                        dataId = _a[_i];
                        return [4, this.loadStorageBlock(dataId)];
                    case 2:
                        item = _c.sent();
                        collection.push(item.status === true ? item.data : null);
                        _c.label = 3;
                    case 3:
                        _i++;
                        return [3, 1];
                    case 4:
                        ;
                        return [2, response_1.response.success("Data storage blocks loaded successfully.", collection)];
                }
            });
        });
    };
    persona.prototype.loadStorageBlock = function (dataId) {
        return __awaiter(this, void 0, void 0, function () {
            var id, getProperId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.setDataBlockID(dataId, true)];
                    case 1:
                        id = _a.sent();
                        return [4, this.setDataBlockID(dataId, false)];
                    case 2:
                        getProperId = (_a.sent()).split("|");
                        return [4, this.loadFile(this.path + "\\" + this.current.id + "\\" + getProperId[0] + this.blockExt).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2, response_1.response.success("Data storage block was loaded successfully.", cypher_1.cypher.decrypt(content.toString(), this.password + this.username))];
                                });
                            }); })];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    persona.prototype.saveStorageBlock = function (dataId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var checkIfBlockExists, newRes, _a;
            var _this = this;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4, this.setDataBlockID(dataId)];
                    case 1:
                        dataId = _b.sent();
                        if (this.current === null)
                            return [2, response_1.response.failed("No profile loaded.")];
                        if (dataId === undefined || dataId === null)
                            return [2, response_1.response.failed("No storage id provided.")];
                        checkIfBlockExists = this.current.link.some(function (item) {
                            var block = cypher_1.cypher.decrypt(item, _this.password + _this.username).split("|");
                            return block[1] === _this.appName && block[2] === dataId;
                        });
                        if (!checkIfBlockExists) return [3, 3];
                        return [4, this.updateStorageBlock(dataId, content)];
                    case 2:
                        _a = _b.sent();
                        return [3, 5];
                    case 3: return [4, this.createStorageBlock(dataId, content)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        newRes = _a;
                        if (newRes.status === true) {
                            return [2, response_1.response.success("Data storage block " + dataId[2] + " was saved successfully.")];
                        }
                        else {
                            return [2, newRes];
                        }
                        return [2];
                }
            });
        });
    };
    persona.prototype.deleteStorageBlock = function (dataId) {
        if (dataId === void 0) { dataId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var personaId, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.find(this.username, this.password)];
                    case 1:
                        personaId = _a.sent();
                        return [4, this.setDataBlockID(dataId)];
                    case 2:
                        dataId = _a.sent();
                        if (!(personaId !== null)) return [3, 6];
                        if (!(dataId === null)) return [3, 4];
                        return [4, fs.promises.readdir(this.path + "\\" + personaId)];
                    case 3:
                        files = _a.sent();
                        try {
                            files.forEach(function (file) {
                                if (file !== "" + _this.root + _this.ext) {
                                    fs.unlinkSync(_this.path + "\\" + personaId + "\\" + file);
                                }
                            });
                            return [2, response_1.response.success("Successfully deleted all storage blocks.")];
                        }
                        catch (_b) {
                            return [2, response_1.response.failed("Could not find any storage blocks to delete.")];
                        }
                        return [3, 5];
                    case 4:
                        try {
                            fs.unlinkSync(this.path + "\\" + personaId + "\\" + (dataId.split('|')[0]) + this.blockExt);
                            return [2, response_1.response.success("Successfully deleted data storage block.[" + dataId + "]")];
                        }
                        catch (err) {
                            return [2, response_1.response.failed("Failed to find the data storage block.[" + dataId + "]")];
                        }
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6: return [2, response_1.response.failed("Failed to delete data storage block(s) because no Persona was found.")];
                    case 7: return [2];
                }
            });
        });
    };
    persona.prototype.find = function (username, password) {
        if (username === void 0) { username = null; }
        if (password === void 0) { password = null; }
        return __awaiter(this, void 0, void 0, function () {
            var files, id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.current !== null && password === this.password && username === this.username)
                            return [2, this.current.id];
                        return [4, fs.promises.readdir(this.path)];
                    case 1:
                        files = _a.sent();
                        id = null;
                        return [4, this.asyncFind(files, function (personaId) { return __awaiter(_this, void 0, void 0, function () {
                                var personaFolder, rootFile, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            personaFolder = this.path + "\\" + personaId;
                                            if (!fs.lstatSync(personaFolder).isDirectory()) return [3, 2];
                                            _b = (_a = JSON).parse;
                                            return [4, this.loadFile(personaFolder + "\\" + this.root + this.ext)];
                                        case 1:
                                            rootFile = _b.apply(_a, [_c.sent()]);
                                            return [2, username === cypher_1.cypher.decrypt(rootFile.username, password + username)];
                                        case 2: return [2];
                                    }
                                });
                            }); })];
                    case 2:
                        id = _a.sent();
                        return [2, id === null || id === undefined || typeof id !== 'string' ? null : id];
                }
            });
        });
    };
    persona.prototype.updateFile = function (path, filename, data) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorMsg = "Failed to save file, please make sure this Application has the correct permissions.";
                        return [4, new Promise(function (resolve, reject) {
                                var _this = this;
                                if (!fs.existsSync(path)) {
                                    fs.mkdir(path, { recursive: true }, function (err) { return __awaiter(_this, void 0, void 0, function () {
                                        return __generator(this, function (_a) {
                                            if (err) {
                                                reject(errorMsg);
                                            }
                                            fs.writeFile(path + "\\" + filename, data, function (err) {
                                                if (err) {
                                                    reject(errorMsg);
                                                }
                                                resolve(true);
                                            });
                                            return [2];
                                        });
                                    }); });
                                }
                                else {
                                    fs.writeFile(path + "\\" + filename, data, function (err) {
                                        if (err) {
                                            reject(errorMsg);
                                        }
                                        resolve(true);
                                    });
                                }
                            })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    persona.prototype.loadFile = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, new Promise(function (resolve, reject) {
                            if (fs.existsSync(filename)) {
                                fs.readFile(filename, function (err, file) {
                                    if (err) {
                                        reject(err);
                                    }
                                    resolve(file);
                                });
                            }
                            else {
                                reject(new Error("Cannot find the file you specified."));
                            }
                        })];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    persona.prototype.generatePersonaId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newId, files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newId = uuid();
                        if (!fs.existsSync(path)) return [3, 2];
                        return [4, fs.promises.readdir(this.path)];
                    case 1:
                        files = _a.sent();
                        while (files.includes(newId)) {
                            newId = uuid();
                        }
                        _a.label = 2;
                    case 2: return [2, newId];
                }
            });
        });
    };
    persona.prototype.generateStorageId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newId;
            return __generator(this, function (_a) {
                newId = uuid();
                if (this.current.link != null)
                    while (this.current.link.some(function (item) { return item.includes(newId); })) {
                        newId = uuid();
                    }
                return [2, newId];
            });
        });
    };
    persona.prototype.setDataBlockID = function (unknown, encrypt) {
        if (encrypt === void 0) { encrypt = false; }
        return __awaiter(this, void 0, void 0, function () {
            var colonCheck, newId, decrypted, exists;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (unknown === null)
                            return [2, null];
                        colonCheck = unknown.includes("|") ? unknown.split("|").length : 0;
                        if (!(colonCheck === 0)) return [3, 2];
                        return [4, this.generateStorageId().then(function (result) { return result; })];
                    case 1:
                        newId = _a.sent();
                        decrypted = cypher_1.cypher.decrypt(unknown, this.password + this.username);
                        if (typeof decrypted === "string" && decrypted.split("|").length === 3) {
                            return [2, encrypt ? unknown : decrypted];
                        }
                        else {
                            exists = this.current.link.find(function (item) { return cypher_1.cypher.decrypt(item, _this.password + _this.username).includes("|" + _this.appName + "|" + unknown); });
                            return [2, exists !== undefined ? cypher_1.cypher.decrypt(exists, this.password + this.username) : newId + "|" + this.appName + "|" + unknown];
                        }
                        return [3, 3];
                    case 2:
                        if (colonCheck === 3) {
                            return [2, encrypt ? cypher_1.cypher.encrypt(unknown, this.password + this.username) : unknown];
                        }
                        else {
                            return [2, null];
                        }
                        _a.label = 3;
                    case 3: return [2];
                }
            });
        });
    };
    persona.prototype.createStorageBlock = function (id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var personaLocation, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        personaLocation = this.path + "\\" + this.current.id;
                        this.current.link.push(cypher_1.cypher.encrypt(id, this.password + this.username));
                        return [4, this.updateFile(personaLocation, "" + id.split("|")[0] + this.blockExt, cypher_1.cypher.encrypt(content, this.password + this.username))];
                    case 1:
                        _a.sent();
                        return [4, this.updateFile(personaLocation, "" + this.root + this.ext, JSON.stringify(this.current))];
                    case 2:
                        _a.sent();
                        return [2, response_1.response.success("Data storage block successfully created.")];
                    case 3:
                        err_1 = _a.sent();
                        return [2, response_1.response.failed("Data storage block " + id[2] + " failed to create successfully.")];
                    case 4: return [2];
                }
            });
        });
    };
    persona.prototype.updateStorageBlock = function (id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4, this.updateFile(this.path + "\\" + this.current.id, "" + id.split("|")[0] + this.blockExt, cypher_1.cypher.encrypt(content, this.password + this.username))];
                    case 1:
                        _a.sent();
                        return [2, response_1.response.success("Data storage block " + id[2] + " successfully updated.")];
                    case 2:
                        err_2 = _a.sent();
                        return [2, response_1.response.failed("Data storage block " + id[2] + " failed to update successfully.")];
                    case 3: return [2];
                }
            });
        });
    };
    return persona;
}());
exports.persona = persona;
//# sourceMappingURL=index.js.map