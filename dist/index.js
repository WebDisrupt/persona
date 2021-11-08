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
/**
 * Persona - Personal information storage, privacy, and security
 */
var hash_strength_1 = require("./models/hash-strength");
exports.hashStrength = hash_strength_1.hashStrength;
exports.hashStrengthDetails = hash_strength_1.hashStrengthDetails;
var cypher_1 = require("./modules/cypher");
var generic_1 = require("./modules/generic");
var response_1 = require("./modules/response");
var defaults = {
    root: "root",
    system: "system",
    ext: ".persona",
    blockExt: ".pstore",
    versionName: "pstore.ver",
    appName: "default",
    path: "C:\\personas" // Current Personas folder location
};
var promises_1 = require("fs/promises");
var uuid = require('uuid-random');
var fs = require("fs");
var path = require("path");
var recursive = require("recursive-readdir");
var persona = /** @class */ (function () {
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    function persona(options) {
        if (options === void 0) { options = null; }
        this.appName = defaults.appName; // Your application name
        this.path = defaults.path; // Current Personas folder location
        this.current = null; // The currently loaded Persona (Encrypted/unusable)
        this.recentList = []; // A list of all recently loaded personas
        this.previous = null; // Last opened Persona (usable)
        this.profile = null; // Stores version of profile data (usable)
        this.username = null; // The current temp username (usable)
        this.password = null; // The current temp password (usable)
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
        // Create directory
        if (!fs.existsSync(this.path))
            fs.mkdirSync(this.path, { recursive: true });
        // TODO add dynamic module loading -> this.moduleList = options?.modules ? this.moduleList.concat(options?.modules) : this.moduleList;
    }
    /**
     * Return null if user was never loggedIn, returns previous if there was a previous persona user.
     */
    persona.prototype.isLoggedIn = function () {
        return this.username != null && this.password != null ? response_1.response.success(this.username + " is currently logged in.") :
            this.previous !== null ? response_1.response.failed(this.previous.username + " is not currently logged in.", this.previous) : response_1.response.failed("No user is currently logged in.", null);
    };
    /**
     *  Returns the current Persona's id or null if not loggedIn
     */
    persona.prototype.getId = function () {
        return this.username != null && this.password != null ? response_1.response.success(this.username + "'s id was found.", this.current.id) :
            response_1.response.failed("No user is currently logged in.", null);
    };
    /**
     * Return the currently loaded username inside the standard response body
     */
    persona.prototype.getUsername = function () {
        return this.username != null ? response_1.response.success(this.username + " was found.", this.username) :
            this.previous !== null ? response_1.response.failed(this.previous.username + " is not currently logged in.") : response_1.response.failed("No user is currently logged in.");
    };
    /**
     * Get the current Persona's profile details
     * @returns
     */
    persona.prototype.getProfile = function () {
        return this.profile === null ? response_1.response.failed("No current profile exists.") : response_1.response.success(this.username + "'s profile has been loaded successfully.", this.profile);
    };
    /**
     * Save Persona's profile details
     * @returns
     */
    persona.prototype.saveProfile = function (newProfile) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.username === null || this.password === null)
                            return [2 /*return*/, response_1.response.failed("No current profile exists.")];
                        this.profile = newProfile;
                        this.current.profile = cypher_1.cypher.encrypt(JSON.stringify(newProfile), this.password + this.username);
                        return [4 /*yield*/, this.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response_1.response.success(this.username + "'s profile was saved successfully.")];
                }
            });
        });
    };
    /**
     * Switches to a new profile
     * @param username
     * @param password
     */
    persona.prototype["switch"] = function (username, password) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.unload()];
                    case 1:
                        _a.sent();
                        this.username = username;
                        this.username = password;
                        return [2 /*return*/, this.load()];
                }
            });
        });
    };
    /**
     * Get all recently loaded profiles
     * @returns
     */
    persona.prototype.getRecentList = function () {
        return this.recentList !== null ? response_1.response.success("Success, " + this.recentList.length + " Prsonas found.", this.recentList) : response_1.response.failed("Could not find any recently loaded Prsonas.");
    };
    /**
     * Add a new entry to the recently loaded list.
     * @param recentlyLoadedPersona
     */
    persona.prototype.addRecentListItem = function (recentlyLoadedPersona) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.recentList.includes(recentlyLoadedPersona)) {
                            this.recentList.push(recentlyLoadedPersona);
                        }
                        return [4 /*yield*/, this.systemSave()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Load temporal persona system data that can be used to house common data outside of the persona's
     */
    persona.prototype.systemLoad = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var filename, message, _b, _c, _d, _e, _f, _g;
            return __generator(this, function (_h) {
                switch (_h.label) {
                    case 0:
                        filename = this.path + "\\" + defaults.system + defaults.ext;
                        message = null;
                        if (!fs.existsSync(filename)) return [3 /*break*/, 5];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 3, , 4]);
                        _c = (_b = response_1.response).success;
                        _d = ["System data was loaded successfully."];
                        _f = (_e = JSON).parse;
                        return [4 /*yield*/, promises_1.readFile(filename, { encoding: "utf8" })];
                    case 2:
                        message = _c.apply(_b, _d.concat([_f.apply(_e, [_h.sent()])]));
                        return [3 /*break*/, 4];
                    case 3:
                        _g = _h.sent();
                        message = response_1.response.failed("Failed to load System data, file might be locked or is corrupted.");
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        message = response_1.response.failed("Failed to find System data.");
                        _h.label = 6;
                    case 6:
                        if (message.status) {
                            try {
                                this.recentList = message.data.recentList;
                                this.username = ((_a = message.data.previous) === null || _a === void 0 ? void 0 : _a.username) || null;
                                this.previous = message.data.previous;
                            }
                            catch (_j) {
                                message = response_1.response.failed("Failed to setup System data.");
                            }
                        }
                        return [2 /*return*/, message];
                }
            });
        });
    };
    /**
     * Save temporal persona system data that can be used to house common data outside of the persona's
     */
    persona.prototype.systemSave = function () {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var systemData, wasSaved;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (this.current !== null) {
                            this.previous = {
                                id: this.current.id,
                                username: this.username,
                                avatar: ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.avatar) != null ? this.profile.avatar : null
                            };
                        }
                        else {
                            this.previous = null;
                        }
                        systemData = {
                            previous: this.previous,
                            recentList: this.recentList
                        };
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path, "" + defaults.system + defaults.ext, JSON.stringify(systemData))];
                    case 1:
                        wasSaved = _b.sent();
                        return [2 /*return*/, wasSaved ? response_1.response.success("System data was saved successfully.") : response_1.response.failed("Failed to save system data.")];
                }
            });
        });
    };
    /**
     * Unloads all currently loaded data. Essentially the same as logging out.
     * @returns
     */
    persona.prototype.unload = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.current === null)
                            return [2 /*return*/, response_1.response.failed("Persona cannot be unloaded because no Persona loaded.")];
                        return [4 /*yield*/, this.systemSave()];
                    case 1:
                        _a.sent();
                        this.current = null;
                        this.username = null;
                        this.password = null;
                        this.profile = null;
                        return [2 /*return*/, response_1.response.success("Successfully logged out of the Persona " + this.previous.username + ".")];
                }
            });
        });
    };
    /**
     * Find Persona based on username. Use password to decrypt. Load additional storage blocks based on datamap parameter.
     * @param username - Unique username associated with the Persona.
     * @param password - Master password associated with the Persona.
     * @param dataMap - Only pull back the sorage blocks you need to get started.
     */
    persona.prototype.load = function (username, password) {
        if (username === void 0) { username = null; }
        if (password === void 0) { password = null; }
        return __awaiter(this, void 0, void 0, function () {
            var id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        username = username === null ? this.username : username;
                        password = password === null ? this.password : password;
                        return [4 /*yield*/, this.find(username, password)];
                    case 1:
                        id = _a.sent();
                        if (!(id !== null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, generic_1.generic.fileLoad(this.path + "\\" + id + "\\" + defaults.root + defaults.ext).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                var persona;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            persona = JSON.parse(content);
                                            return [4 /*yield*/, cypher_1.cypher.verify(password + username, persona.password)];
                                        case 1:
                                            if (!_b.sent()) return [3 /*break*/, 3];
                                            this.password = password;
                                            this.username = username;
                                            this.current = persona;
                                            this.profile = JSON.parse(cypher_1.cypher.decrypt(persona.profile, password + username));
                                            return [4 /*yield*/, this.addRecentListItem({ id: id, username: username, avatar: ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.avatar) || null, location: this.path + "\\" + id })];
                                        case 2:
                                            _b.sent();
                                            return [2 /*return*/, response_1.response.success(username + ", Welcome back!")];
                                        case 3: return [2 /*return*/, response_1.response.failed("The username or password is incorrect.")];
                                    }
                                });
                            }); })];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [2 /*return*/, response_1.response.failed("The username or password is incorrect.")];
                }
            });
        });
    };
    /**
     * Delete a Persona and all data storage.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
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
                        return [4 /*yield*/, this.find(username, password)];
                    case 1:
                        id = _b.sent();
                        if (!(id !== null)) return [3 /*break*/, 7];
                        _b.label = 2;
                    case 2:
                        _b.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fs.rmdirSync(this.path + "\\" + id, { recursive: true })];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.unload()];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, response_1.response.success(username + "'s Persona has been deleted.")];
                    case 5:
                        _a = _b.sent();
                        return [2 /*return*/, response_1.response.failed("Something failed when deleting this Persona.")];
                    case 6: return [3 /*break*/, 8];
                    case 7: return [2 /*return*/, response_1.response.failed("Could not find a valid Persona or it has already been deleted.")];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Allows users to create a new Persona.
     * @param username - useranme required to create new Persona.
     * @param password - password required to secure new Persona.
     * @param strength - (optional) Passsword Hashing Strength.
     * @returns response object contains a one-time recovery code as the data property
     */
    persona.prototype.create = function (username, password, strength) {
        if (strength === void 0) { strength = hash_strength_1.hashStrength.medium; }
        return __awaiter(this, void 0, void 0, function () {
            var checkIfPersonaExists, newID, recoveryId, location, key;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.unload()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.find(username, password)];
                    case 2:
                        checkIfPersonaExists = _a.sent();
                        if (checkIfPersonaExists !== null)
                            return [2 /*return*/, response_1.response.failed("Persona " + username + " already exists, please select a different username.")];
                        return [4 /*yield*/, this.generatePersonaId().then(function (id) { return id; })];
                    case 3:
                        newID = _a.sent();
                        recoveryId = cypher_1.cypher.generateRecoveryCode();
                        location = this.path + "\\" + newID;
                        key = password + username;
                        return [4 /*yield*/, cypher_1.cypher.hash(key, Number(strength.toString())).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
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
                                            return [4 /*yield*/, this.addRecentListItem({ id: newID, username: username, avatar: null, location: location })];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, generic_1.generic.fileUpdate(location, "" + defaults.root + defaults.ext, JSON.stringify(newProfile))];
                                        case 2:
                                            newRes = _a.sent();
                                            return [2 /*return*/, newRes ? response_1.response.success("Persona " + this.username + " successfully created.", recoveryId) : response_1.response.failed("Persona " + this.username + " failed to be created. Please check folder permissions.")];
                                    }
                                });
                            }); })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Save the currently loaded Persona.
     * @param username (optional) - Needed for creating a new Persona, before saving.
     * @param password (optional) - Needed for creating a new Persona, before saving.
     */
    persona.prototype.save = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newRes;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(this.current !== null && this.username !== null && this.password !== null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path + "\\" + this.current.id, "" + defaults.root + defaults.ext, JSON.stringify(this.current))];
                    case 1:
                        newRes = _a.sent();
                        return [2 /*return*/, newRes ? response_1.response.success("Persona " + this.username + " successfully created.") : response_1.response.failed("Persona " + this.username + " failed to be created. Please check folder permissions.")];
                    case 2: return [2 /*return*/, response_1.response.failed('Persona failed to be saved. No Persona is active.')];
                }
            });
        });
    };
    /**
     * Find a Persona with username and password
     * @param username
     * @param password
     * @returns
     */
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
                            return [2 /*return*/, this.current.id];
                        return [4 /*yield*/, fs.promises.readdir(this.path)];
                    case 1:
                        files = _a.sent();
                        id = null;
                        return [4 /*yield*/, generic_1.generic.asyncFind(files, function (personaId) { return __awaiter(_this, void 0, void 0, function () {
                                var personaFolder, rootFile, _a, _b;
                                return __generator(this, function (_c) {
                                    switch (_c.label) {
                                        case 0:
                                            personaFolder = this.path + "\\" + personaId;
                                            if (!fs.lstatSync(personaFolder).isDirectory()) return [3 /*break*/, 2];
                                            _b = (_a = JSON).parse;
                                            return [4 /*yield*/, generic_1.generic.fileLoad(personaFolder + "\\" + defaults.root + defaults.ext)];
                                        case 1:
                                            rootFile = _b.apply(_a, [_c.sent()]);
                                            return [2 /*return*/, username === cypher_1.cypher.decrypt(rootFile.username, password + username)];
                                        case 2: return [2 /*return*/];
                                    }
                                });
                            }); })];
                    case 2:
                        id = _a.sent();
                        return [2 /*return*/, id === null || id === undefined || typeof id !== 'string' ? null : id];
                }
            });
        });
    };
    /**
     * Checks if existing system IDs in path to check if ID is truly unique
     * @param path - Location to check if unique ID is actually unique
     * @returns
     */
    persona.prototype.generatePersonaId = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newId, files;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        newId = uuid();
                        if (!fs.existsSync(path)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.promises.readdir(this.path)];
                    case 1:
                        files = _a.sent();
                        while (files.includes(newId)) {
                            newId = uuid();
                        }
                        _a.label = 2;
                    case 2: return [2 /*return*/, newId];
                }
            });
        });
    };
    /// **********************************
    /// Storage Blocks *************************************************************************************************************************************************************************
    /// **********************************
    /**
     * Checks whether the storage block id exists.
     * @param id - pass in the storage block id
     * @returns
     */
    persona.prototype.SB_doesIdExist = function (storageBlockId) {
        var _this = this;
        return this.current != null && this.current.link != null && this.current.link.length > 0 ? this.current.link.some(function (item) { return cypher_1.cypher.decrypt(item, _this.password + _this.username).includes(storageBlockId); }) : false;
    };
    /**
     * Check if storage block exists
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns {boolean}
     */
    persona.prototype.SB_exist = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var getProperId;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SB_formatId(storageBlockId, false)];
                    case 1:
                        getProperId = (_a.sent()).split("|");
                        return [2 /*return*/, fs.existsSync(this.path + "\\" + this.current.id + "\\" + getProperId[0] + defaults.blockExt) ? true : false];
                }
            });
        });
    };
    /**
     * Returns a properly formated data block id. You can pass in an encrypted, or decrypted version, or just a data block name.
     * @param unkown Takes an id in an unknown state
     * @param encrypt returns it encrupted or dcrypted
     * @returns
     */
    persona.prototype.SB_formatId = function (unknown, encrypt) {
        if (encrypt === void 0) { encrypt = false; }
        return __awaiter(this, void 0, void 0, function () {
            var colonCheck, newId, decrypted, exists;
            var _this = this;
            return __generator(this, function (_a) {
                if (unknown === null)
                    return [2 /*return*/, null];
                colonCheck = unknown.includes("|") ? unknown.split("|").length : 0;
                if (colonCheck === 0) {
                    newId = generic_1.generic.generateUUID();
                    while (this.SB_exist(newId)) {
                        newId = generic_1.generic.generateUUID();
                    }
                    ;
                    console.log("newId: ", newId);
                    decrypted = cypher_1.cypher.decrypt(unknown, this.password + this.username);
                    if (typeof decrypted === "string" && decrypted.split("|").length === 3) {
                        return [2 /*return*/, encrypt ? unknown : decrypted];
                    }
                    else {
                        exists = this.current === null ? undefined : this.current.link.find(function (item) { return cypher_1.cypher.decrypt(item, _this.password + _this.username).includes("|" + _this.appName + "|" + unknown); });
                        return [2 /*return*/, exists !== undefined ? cypher_1.cypher.decrypt(exists, this.password + this.username) : newId + "|" + this.appName + "|" + unknown];
                    }
                }
                else if (colonCheck === 3) {
                    return [2 /*return*/, encrypt ? cypher_1.cypher.encrypt(unknown, this.password + this.username) : unknown];
                }
                else {
                    return [2 /*return*/, null];
                }
                return [2 /*return*/];
            });
        });
    };
    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns
     */
    persona.prototype.SB_load = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var getProperId;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SB_formatId(storageBlockId, false)];
                    case 1:
                        getProperId = (_a.sent()).split("|");
                        return [4 /*yield*/, this.SB_exist(storageBlockId)];
                    case 2:
                        if (!!(_a.sent())) return [3 /*break*/, 3];
                        this.SB_removeFromList(storageBlockId);
                        return [2 /*return*/, response_1.response.failed("Data storage block " + storageBlockId + " doesn't exist.", this.path + "\\" + this.current.id + "\\" + getProperId[0] + defaults.blockExt)];
                    case 3: return [4 /*yield*/, generic_1.generic.fileLoad(this.path + "\\" + this.current.id + "\\" + getProperId[0] + defaults.blockExt).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, response_1.response.success("Data storage block " + storageBlockId + " was loaded successfully.", cypher_1.cypher.decrypt(content.toString(), this.password + this.username))];
                            });
                        }); })];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    persona.prototype.SB_loadAll = function (objectMap) {
        if (objectMap === void 0) { objectMap = null; }
        return __awaiter(this, void 0, void 0, function () {
            var newObjectMap, dataIdMap, _a, _b, _i, index, property, item, err_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        newObjectMap = {};
                        dataIdMap = Object.keys(objectMap);
                        _a = [];
                        for (_b in dataIdMap)
                            _a.push(_b);
                        _i = 0;
                        _c.label = 1;
                    case 1:
                        if (!(_i < _a.length)) return [3 /*break*/, 6];
                        index = _a[_i];
                        property = dataIdMap[index];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        return [4 /*yield*/, this.load(property)];
                    case 3:
                        item = _c.sent();
                        if ((item === null || item === void 0 ? void 0 : item.status) === true) {
                            try {
                                newObjectMap[property] = JSON.parse(item.data);
                            }
                            catch (err) {
                                newObjectMap[property] = item.data;
                            }
                        }
                        else {
                            newObjectMap[property] = objectMap[property];
                        }
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _c.sent();
                        newObjectMap[property] = objectMap[property];
                        return [3 /*break*/, 5];
                    case 5:
                        _i++;
                        return [3 /*break*/, 1];
                    case 6: return [2 /*return*/, response_1.response.success("Data storage blocks loaded successfully.", newObjectMap)];
                }
            });
        });
    };
    /**
     * Saves a block of data to an existing block or creates a new block.
     * @param storageBlockId - Required to identify where, how, and when this data will be used in your application. Cannot contain '|' chaacter.
     * @param content - An object, collection, or string that can be formated how ever you would like to consume it with your application.
     * @returns
     */
    persona.prototype.SB_save = function (storageBlockId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var dataId, newRes, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof content !== "string")
                            content = JSON.stringify(content);
                        return [4 /*yield*/, this.SB_formatId(storageBlockId)];
                    case 1:
                        dataId = _b.sent();
                        if (this.current === null)
                            return [2 /*return*/, response_1.response.failed("No profile loaded.")];
                        if (dataId === undefined || dataId === null)
                            return [2 /*return*/, response_1.response.failed("No storage id provided.")];
                        if (!this.SB_exist(dataId)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.SB_update(dataId, content)];
                    case 2:
                        _a = _b.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, this.SB_create(dataId, content)];
                    case 4:
                        _a = _b.sent();
                        _b.label = 5;
                    case 5:
                        newRes = _a;
                        if (newRes.status === true) {
                            return [2 /*return*/, response_1.response.success("Data storage block " + (dataId.split('|'))[2] + " was saved successfully.")];
                        }
                        else {
                            return [2 /*return*/, newRes];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Creates a new storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    persona.prototype.SB_create = function (id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var personaLocation, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        personaLocation = this.path + "\\" + this.current.id;
                        this.current.link.push(cypher_1.cypher.encrypt(id, this.password + this.username));
                        return [4 /*yield*/, generic_1.generic.fileUpdate(personaLocation, "" + id.split("|")[0] + defaults.blockExt, cypher_1.cypher.encrypt(content, this.password + this.username))];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, generic_1.generic.fileUpdate(personaLocation, "" + defaults.root + defaults.ext, JSON.stringify(this.current))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, response_1.response.success("Data storage block successfully created.")];
                    case 3:
                        err_2 = _a.sent();
                        return [2 /*return*/, response_1.response.failed("Data storage block " + id[2] + " failed to create successfully.")];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates an existing Storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    persona.prototype.SB_update = function (id, content) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path + "\\" + this.current.id, "" + id.split("|")[0] + defaults.blockExt, cypher_1.cypher.encrypt(content, this.password + this.username))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response_1.response.success("Data storage block " + id[2] + " successfully updated.")];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, response_1.response.failed("Data storage block " + id[2] + " failed to update successfully.")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    persona.prototype.SB_delete = function (storageBlockId) {
        if (storageBlockId === void 0) { storageBlockId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var dataId, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.SB_formatId(storageBlockId)];
                    case 1:
                        dataId = _a.sent();
                        if (!(this.current.id !== null)) return [3 /*break*/, 5];
                        if (!(dataId === null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, fs.promises.readdir(this.path + "\\" + this.current.id)];
                    case 2:
                        files = _a.sent();
                        try {
                            files.forEach(function (file) {
                                if (file !== "" + defaults.root + defaults.ext) {
                                    fs.unlinkSync(_this.path + "\\" + _this.current.id + "\\" + file);
                                }
                            });
                            return [2 /*return*/, response_1.response.success("Successfully deleted all storage blocks.")];
                        }
                        catch (_b) {
                            return [2 /*return*/, response_1.response.failed("Could not find any storage blocks to delete.")];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        try {
                            fs.unlinkSync(this.path + "\\" + this.current.id + "\\" + (dataId.split('|')[0]) + defaults.blockExt);
                            return [2 /*return*/, response_1.response.success("Successfully deleted data storage block.[" + dataId + "]")];
                        }
                        catch (err) {
                            return [2 /*return*/, response_1.response.failed("Failed to find the data storage block.[" + dataId + "]")];
                        }
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5: return [2 /*return*/, response_1.response.failed("Failed to delete data storage block(s) because no Persona was found.")];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns
    */
    persona.prototype.SB_getList = function () {
        var _this = this;
        var newLinkList = [];
        if (this.current !== null) {
            this.current.link.forEach(function (item) { newLinkList.push(cypher_1.cypher.decrypt(item, _this.password + _this.username)); });
            return response_1.response.success("All storage blocks listed.", newLinkList);
        }
        else {
            return response_1.response.failed("Can't list storage blocks, please login.", []);
        }
    };
    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns
    */
    persona.prototype.SB_removeFromList = function (storageBlockId) {
        var _this = this;
        try {
            var indexToRemove = this.current.link.findIndex(function (item) {
                return (cypher_1.cypher.decrypt(item, _this.password + _this.username).split("|"))[2] === storageBlockId;
            });
            this.current.link.splice(indexToRemove, 1);
            return response_1.response.success("Storage block not found so it was removed from the link object.");
        }
        catch (_a) {
            return response_1.response.failed("Failed to remove element at index because it doesn't exist on link object.");
        }
    };
    /// **********************************
    /// Storage Blocks Directory *************************************************************************************************************************************************************************
    /// **********************************
    /**
     * Save the entire file structure inside a directory to a storage block. Does not save empty directories
     * @param directoryPath - Directory you would like to save
     * @param storageBlockId
     */
    persona.prototype.SBD_save = function (directoryPath, storageBlockId, clearDirectory) {
        var _a;
        if (clearDirectory === void 0) { clearDirectory = false; }
        return __awaiter(this, void 0, void 0, function () {
            var previousVersion, fileDirectory, directoryContent, index, name_1, _b, _c, _d, response;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.load(storageBlockId)];
                    case 1:
                        previousVersion = ((_a = (_f.sent()).data) === null || _a === void 0 ? void 0 : _a.version) || 0;
                        return [4 /*yield*/, recursive(directoryPath)];
                    case 2:
                        fileDirectory = _f.sent();
                        directoryContent = [];
                        index = 0;
                        _f.label = 3;
                    case 3:
                        if (!(index < fileDirectory.length)) return [3 /*break*/, 8];
                        _f.label = 4;
                    case 4:
                        _f.trys.push([4, 6, , 7]);
                        name_1 = fileDirectory[index].substr(fileDirectory[index].lastIndexOf("\\"));
                        _c = (_b = directoryContent).push;
                        _e = { path: fileDirectory[index].replace(name_1, ''), name: name_1.substr(("\\").length) };
                        return [4 /*yield*/, generic_1.generic.fileLoad(fileDirectory[index])];
                    case 5:
                        _c.apply(_b, [(_e.content = (_f.sent()).toString(), _e)]);
                        return [3 /*break*/, 7];
                    case 6:
                        _d = _f.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        index++;
                        return [3 /*break*/, 3];
                    case 8: return [4 /*yield*/, this.SB_save(storageBlockId, { type: "dir", version: previousVersion + 1, path: directoryPath, files: directoryContent })];
                    case 9:
                        response = _f.sent();
                        if (!clearDirectory) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.SBD_clearDirectory(storageBlockId)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11: return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Create a new directory baed on a storage block
     * @param storageBlockId - Storage block that
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    persona.prototype.SBD_load = function (storageBlockId, newLocation) {
        if (newLocation === void 0) { newLocation = null; }
        return __awaiter(this, void 0, void 0, function () {
            var fileDirectory, files, thisPath, _a, index, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        return [4 /*yield*/, this.SB_load(storageBlockId)];
                    case 1:
                        fileDirectory = _c.sent();
                        fileDirectory.data = JSON.parse(fileDirectory.data);
                        files = fileDirectory.data.files;
                        thisPath = newLocation !== null ? newLocation : fileDirectory.data.path;
                        if (!fileDirectory.status) return [3 /*break*/, 10];
                        _a = Number(fileDirectory.data.version);
                        return [4 /*yield*/, this.SBD_getFileVersion(storageBlockId)];
                    case 2:
                        if (!(_a > (_c.sent()))) return [3 /*break*/, 8];
                        index = 0;
                        _c.label = 3;
                    case 3:
                        if (!(index < files.length)) return [3 /*break*/, 6];
                        return [4 /*yield*/, generic_1.generic.fileUpdate(files[index].path.replace(fileDirectory.data.path, thisPath), files[index].name, files[index].content)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 3];
                    case 6: return [4 /*yield*/, generic_1.generic.fileUpdate(thisPath, defaults.versionName, fileDirectory.data.version.toString())];
                    case 7:
                        _c.sent();
                        return [2 /*return*/, response_1.response.success("Directory " + thisPath + " successfully loaded from storage block.")];
                    case 8: return [2 /*return*/, response_1.response.failed("Loaded version is greater please save progress of " + storageBlockId + ".")];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, response_1.response.failed("Data storage block called " + storageBlockId + " was found.")];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        _b = _c.sent();
                        return [2 /*return*/, response_1.response.failed("Data storage block " + storageBlockId + " failed to load.")];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get storage block path based on storage block id
     * @param storageBlockId
     * @returns
     */
    persona.prototype.SBD_getDirectoryPath = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, this.SB_load(storageBlockId)];
                    case 1: return [2 /*return*/, _b.apply(_a, [(_c.sent()).data]).path];
                }
            });
        });
    };
    /**
     * Storage Block Directory - Get version from the pstore.version file inside the directory
     * @param storageBlockId - Storage block that
     * @return New version
     */
    persona.prototype.SBD_getFileVersion = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var thisPath, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.SBD_getDirectoryPath(storageBlockId)];
                    case 1:
                        thisPath = _c.sent();
                        return [4 /*yield*/, fs.existsSync(thisPath + "\\" + defaults.versionName)];
                    case 2:
                        if (!(_c.sent())) return [3 /*break*/, 4];
                        _b = Number;
                        return [4 /*yield*/, generic_1.generic.fileLoad(thisPath + "\\" + defaults.versionName)];
                    case 3:
                        _a = _b.apply(void 0, [_c.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        _a = 0;
                        _c.label = 5;
                    case 5: return [2 /*return*/, _a];
                }
            });
        });
    };
    /**
     * Storage Block not having
     * @param storageBlockId - Storage block that
     * @return New version
     */
    persona.prototype.SBD_increaseVersion = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var thisPath, previousVersion, _a, newVersion;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.SBD_getDirectoryPath(storageBlockId)];
                    case 1:
                        thisPath = _b.sent();
                        _a = Number;
                        return [4 /*yield*/, generic_1.generic.fileLoad(thisPath + "\\" + defaults.versionName)];
                    case 2:
                        previousVersion = _a.apply(void 0, [_b.sent()]) || 0;
                        newVersion = (previousVersion + 1).toString();
                        return [4 /*yield*/, generic_1.generic.fileUpdate(thisPath, defaults.versionName, newVersion)];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, Number(newVersion)];
                }
            });
        });
    };
    /**
     * Removes a directory and all files inside that directory based on storage block name.
     * @param storageBlockId - Name of the storage block
     */
    persona.prototype.SBD_clearDirectory = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = fs).rmdirSync;
                        return [4 /*yield*/, this.SBD_getDirectoryPath(storageBlockId)];
                    case 1:
                        _b.apply(_a, [_d.sent(), { recursive: true }]);
                        return [2 /*return*/, response_1.response.success("The storage block directory was deleted successfully.")];
                    case 2:
                        _c = _d.sent();
                        return [2 /*return*/, response_1.response.failed("The storage block directory failed to be deleted.")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Checks if a directory exists based on storage block name.
     * @param storageBlockId - Name of the storage block
     */
    persona.prototype.SBD_doesDirectoryExist = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = fs).existsSync;
                        return [4 /*yield*/, this.SBD_getDirectoryPath(storageBlockId)];
                    case 1:
                        if (_b.apply(_a, [_d.sent()])) {
                            return [2 /*return*/, response_1.response.success("The storage block folder exists.")];
                        }
                        else {
                            return [2 /*return*/, response_1.response.failed("The storage block folder does not exist.")];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        _c = _d.sent();
                        return [2 /*return*/, response_1.response.failed("Failed to load corrupted storage block or you don't have the right access permissions")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return persona;
}());
exports.persona = persona;
//# sourceMappingURL=index.js.map