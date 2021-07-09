"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
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
exports.persona = exports.personaHelpers = exports.hashStrengthDetails = exports.hashStrength = void 0;
var hash_strength_1 = require("./models/hash-strength");
var cypher_1 = require("./modules/cypher");
var response_1 = require("./modules/response");
var hash_strength_2 = require("./models/hash-strength");
__createBinding(exports, hash_strength_2, "hashStrength");
__createBinding(exports, hash_strength_2, "hashStrengthDetails");
var helpers_1 = require("./modules/helpers");
__createBinding(exports, helpers_1, "personaHelpers");
var uuid = require('uuid-random');
var fs = require("fs");
var path = require("path");
var persona = (function () {
    function persona(options) {
        var _this = this;
        if (options === void 0) { options = null; }
        this.root = "root.persona";
        this.ext = ".pstore";
        this.appName = "default";
        this.path = "C:\\personas";
        this.recentList = [];
        this.current = null;
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
            this.username = options.previous;
        }
        if ((options === null || options === void 0 ? void 0 : options.appName) !== undefined)
            this.appName = options.appName;
    }
    persona.prototype.discovery = function () {
        if (this.username != null) {
            return this.username;
        }
        return null;
    };
    persona.prototype.isLoggedIn = function () {
        return this.username != null && this.password != null ? true : false;
    };
    persona.prototype["switch"] = function (username, password) {
        this.username = username;
        this.username = password;
        this.load();
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
                                var rootFile, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = JSON).parse;
                                            return [4, this.loadFile(this.path + "\\" + personaId + "\\" + this.root)];
                                        case 1:
                                            rootFile = _b.apply(_a, [_c.sent()]);
                                            return [2, username === cypher_1.cypher.decrypt(rootFile.username, password + username)];
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
    persona.prototype.getRecentList = function () {
        return this.recentList;
    };
    persona.prototype.addRecentListItem = function (recentlyLoadedPersona) {
        if (!this.recentList.includes(recentlyLoadedPersona)) {
            this.recentList.push(recentlyLoadedPersona);
        }
    };
    persona.prototype.unload = function () {
        var tempUsername = this.username;
        this.current = null;
        this.username = null;
        this.password = null;
        return response_1.response.success("Successfully logged out of the Persona " + tempUsername + ".");
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
                        username = username === null ? this.username : username;
                        password = password === null ? this.password : password;
                        return [4, this.find(username, password)];
                    case 1:
                        id = _a.sent();
                        if (!(id !== null)) return [3, 3];
                        return [4, this.loadFile(this.path + "\\" + id + "\\" + this.root).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                var persona;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            persona = JSON.parse(content);
                                            return [4, cypher_1.cypher.verify(password + username, persona.password)];
                                        case 1:
                                            if (_a.sent()) {
                                                this.password = password;
                                                this.username = username;
                                                this.current = persona;
                                                if (dataMap != null) {
                                                }
                                                else {
                                                    return [2, true];
                                                }
                                            }
                                            else {
                                                return [2, false];
                                            }
                                            return [2];
                                    }
                                });
                            }); })];
                    case 2: return [2, _a.sent()];
                    case 3: return [2, false];
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
                        if (!(id !== null)) return [3, 6];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 4, , 5]);
                        return [4, fs.rmdirSync(this.path + "\\" + id, { recursive: true })];
                    case 3:
                        _b.sent();
                        this.unload();
                        return [2, true];
                    case 4:
                        _a = _b.sent();
                        return [2, false];
                    case 5: return [3, 7];
                    case 6: return [2, false];
                    case 7: return [2];
                }
            });
        });
    };
    persona.prototype.create = function (username, password, strength) {
        if (strength === void 0) { strength = hash_strength_1.hashStrength.medium; }
        return __awaiter(this, void 0, void 0, function () {
            var files, checkIfPersonaExists, newID, recoveryId, location, key;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, fs.promises.readdir(this.path)];
                    case 1:
                        files = _a.sent();
                        return [4, this.asyncSome(files, function (personaId) { return __awaiter(_this, void 0, void 0, function () {
                                var rootFile, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            _b = (_a = JSON).parse;
                                            return [4, this.loadFile(this.path + "\\" + personaId + "\\" + this.root)];
                                        case 1:
                                            rootFile = _b.apply(_a, [_c.sent()]);
                                            return [2, username === cypher_1.cypher.decrypt(rootFile.username, password + username)];
                                    }
                                });
                            }); })];
                    case 2:
                        checkIfPersonaExists = _a.sent();
                        if (checkIfPersonaExists)
                            return [2, Promise.reject('Persona already exists, please select a different username.')];
                        return [4, this.generatePersonaId().then(function (id) { return id; })];
                    case 3:
                        newID = _a.sent();
                        recoveryId = cypher_1.cypher.generateRecoveryCode();
                        location = this.path + "\\" + newID;
                        key = password + username;
                        return [4, cypher_1.cypher.hash(key, Number(strength.toString())).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
                                var newProfile;
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
                                            this.addRecentListItem({ id: newID, username: username, avatar: null });
                                            return [4, this.updateFile(location, this.root, JSON.stringify(newProfile))];
                                        case 1: return [2, _a.sent()];
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
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.current !== null && this.username !== null && this.password !== null)) return [3, 2];
                        return [4, this.updateFile(this.path + "\\" + this.current.id, this.root, JSON.stringify(this.current))];
                    case 1: return [2, _a.sent()];
                    case 2: return [2];
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
                                reject(new Error("Can not find the file you specified."));
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
                        return [4, this.loadFile(this.path + "\\" + this.current.id + "\\" + getProperId[0] + this.ext).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2, response_1.response.success("Data storage block was loaded successfully. [" + dataId + "]", cypher_1.cypher.decrypt(content.toString(), this.password + this.username))];
                                });
                            }); })];
                    case 3: return [2, _a.sent()];
                }
            });
        });
    };
    persona.prototype.saveStorageBlock = function (dataId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var checkIfBlockExists;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.setDataBlockID(dataId)];
                    case 1:
                        dataId = _a.sent();
                        if (this.current === null)
                            return [2, response_1.response.failed("No profile loaded.")];
                        if (dataId === undefined || dataId === null)
                            return [2, response_1.response.failed("No storage id provided.")];
                        checkIfBlockExists = this.current.link.some(function (item) {
                            var block = cypher_1.cypher.decrypt(item, _this.password + _this.username).split("|");
                            return block[1] === _this.appName && block[2] === dataId;
                        });
                        if (!!checkIfBlockExists) return [3, 3];
                        return [4, this.createStorageBlock(dataId, content)];
                    case 2:
                        _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!checkIfBlockExists) return [3, 5];
                        return [4, this.updateStorageBlock(dataId, content)];
                    case 4:
                        _a.sent();
                        _a.label = 5;
                    case 5: return [2, response_1.response.success("Data storage block was saved successfully. [" + dataId + "]")];
                }
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
            var filename, personaLocation, blockContent, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = id.split("|")[0];
                        personaLocation = this.path + "\\" + this.current.id;
                        this.current.link.push(cypher_1.cypher.encrypt(id, this.password + this.username));
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        blockContent = cypher_1.cypher.encrypt(content, this.password + this.username);
                        return [4, this.updateFile(personaLocation, "" + filename + this.ext, blockContent)];
                    case 2:
                        _a.sent();
                        return [4, this.updateFile(personaLocation, this.root, JSON.stringify(this.current))];
                    case 3:
                        _a.sent();
                        Promise.resolve(true);
                        return [3, 5];
                    case 4:
                        err_1 = _a.sent();
                        Promise.reject(err_1);
                        return [3, 5];
                    case 5: return [2];
                }
            });
        });
    };
    persona.prototype.updateStorageBlock = function (id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var personaLocation, blockContent, err_2;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        id = this.current.link.find(function (item) {
                            var block = cypher_1.cypher.decrypt(item, _this.password + _this.username).split(":");
                            return block[1] === _this.appName && block[2] === id;
                        });
                        personaLocation = this.path + "\\" + this.current.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        blockContent = cypher_1.cypher.encrypt(JSON.stringify(content), this.password + this.username);
                        return [4, this.updateFile(personaLocation, "" + id.split(":")[0] + this.ext, blockContent)];
                    case 2:
                        _a.sent();
                        Promise.resolve(true);
                        return [3, 4];
                    case 3:
                        err_2 = _a.sent();
                        Promise.reject(err_2);
                        return [3, 4];
                    case 4: return [2];
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
                                if (file !== _this.root) {
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
                            fs.unlinkSync(this.path + "\\" + personaId + "\\" + (dataId.split('|')[0]) + this.ext);
                            return [2, response_1.response.success("Successfully deleted data storage block.[" + dataId + "]")];
                        }
                        catch (err) {
                            return [2, response_1.response.failed("Failed to find the data storage block.[" + dataId + "]")];
                        }
                        _a.label = 5;
                    case 5: return [3, 7];
                    case 6: return [2, response_1.response.failed("Failed to delete data storage block(s) because no persona was found.")];
                    case 7: return [2];
                }
            });
        });
    };
    return persona;
}());
exports.persona = persona;
//# sourceMappingURL=index.js.map