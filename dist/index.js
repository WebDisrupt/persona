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
var cypher_1 = require("./helpers/cypher");
var generic_1 = require("./helpers/generic");
var response_1 = require("./helpers/response");
var config_1 = require("./config");
/* Independant Modules */
var storage_block_1 = require("./modules/storage-block");
var storage_block_directory_1 = require("./modules/storage-block-directory");
var uuid = require('uuid-random');
var fs = require("fs");
var path = require("path");
var persona = /** @class */ (function () {
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    function persona(options) {
        if (options === void 0) { options = null; }
        var _a;
        this.appName = config_1.defaults.appName; // Your application name
        this.path = config_1.defaults.path; // Current Personas folder location
        this.current = null; // The currently loaded Persona (Encrypted/unusable)
        this.recentList = []; // A list of all recently loaded personas
        this.previous = null; // Last opened Persona (usable)
        this.profile = null; // Stores version of profile data (usable)
        this.username = null; // The current temp username (usable)
        this.password = null; // The current temp password (usable)
        this.key = null; // The key used for encryption
        // Modules
        this.module = {
            storageBlock: null,
            storageBlockDirectory: null
        };
        if ((options === null || options === void 0 ? void 0 : options.path) !== undefined)
            this.path = options.path;
        if ((options === null || options === void 0 ? void 0 : options.recentList) !== undefined)
            this.recentList = options.recentList;
        if ((options === null || options === void 0 ? void 0 : options.previous) !== undefined)
            this.previous = options.previous;
        if (((_a = options === null || options === void 0 ? void 0 : options.previous) === null || _a === void 0 ? void 0 : _a.username) !== undefined)
            this.username = options.previous.username;
        if ((options === null || options === void 0 ? void 0 : options.appName) !== undefined)
            this.appName = options.appName;
        // Create directory
        if (!fs.existsSync(this.path))
            fs.mkdirSync(this.path, { recursive: true });
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
                        this.current.profile = cypher_1.cypher.encrypt(JSON.stringify(newProfile), this.key);
                        return [4 /*yield*/, this.save()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response_1.response.success(this.username + "'s profile was saved successfully.")];
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
                        filename = this.path + "\\" + config_1.defaults.system;
                        message = null;
                        if (!fs.existsSync(filename)) return [3 /*break*/, 5];
                        _h.label = 1;
                    case 1:
                        _h.trys.push([1, 3, , 4]);
                        _c = (_b = response_1.response).success;
                        _d = ["System data was loaded successfully."];
                        _f = (_e = JSON).parse;
                        return [4 /*yield*/, generic_1.generic.fileLoad(filename)];
                    case 2:
                        message = _c.apply(_b, _d.concat([_f.apply(_e, [_h.sent()])]));
                        return [3 /*break*/, 4];
                    case 3:
                        _g = _h.sent();
                        message = response_1.response.failed("Failed to load System data, file might be locked or is corrupted.");
                        return [3 /*break*/, 4];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        message = response_1.response.failed("No System data file exists.");
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
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path, "" + config_1.defaults.system, JSON.stringify(systemData))];
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
                        this.key = null;
                        this.password = null;
                        this.profile = null;
                        this.loadModules();
                        return [2 /*return*/, response_1.response.success("Successfully logged out of the Persona " + this.previous.username + ".")];
                }
            });
        });
    };
    /**
     * Login will handle all the init functions after a new user is created or loaded
     */
    persona.prototype.login = function () {
        this.loadModules();
    };
    /**
     * Load modules - Refreshes modules with new data, and removes any stale data
     * @returns
     */
    persona.prototype.loadModules = function () {
        if (this.current === null) {
            this.module = null;
        }
        else {
            this.module = {
                storageBlock: new storage_block_1.StorageBlock({ path: this.path, appName: this.appName, personaId: this.current.id, key: this.key }),
                storageBlockDirectory: new storage_block_directory_1.StorageBlockDirectory({ path: this.path, appName: this.appName, personaId: this.current.id, key: this.key })
            };
        }
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
                    case 0: return [4 /*yield*/, this.unload()];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.find(username, password)];
                    case 2:
                        id = _a.sent();
                        if (!(id !== null)) return [3 /*break*/, 4];
                        return [4 /*yield*/, generic_1.generic.fileLoad(this.path + "\\" + id + "\\" + config_1.defaults.root).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                var persona;
                                var _a;
                                return __generator(this, function (_b) {
                                    switch (_b.label) {
                                        case 0:
                                            persona = JSON.parse(content);
                                            this.key = password + username;
                                            return [4 /*yield*/, cypher_1.cypher.verify(this.key, persona.password)];
                                        case 1:
                                            if (!_b.sent()) return [3 /*break*/, 3];
                                            this.password = password;
                                            this.username = username;
                                            this.current = persona;
                                            this.profile = JSON.parse(cypher_1.cypher.decrypt(persona.profile, this.key));
                                            return [4 /*yield*/, this.addRecentListItem({ id: id, username: username, avatar: ((_a = this.profile) === null || _a === void 0 ? void 0 : _a.avatar) || null, location: this.path + "\\" + id })];
                                        case 2:
                                            _b.sent();
                                            this.login();
                                            return [2 /*return*/, response_1.response.success(username + ", Welcome back!")];
                                        case 3: return [2 /*return*/, response_1.response.failed("The username or password is incorrect.")];
                                    }
                                });
                            }); })];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4: return [2 /*return*/, response_1.response.failed("The username or password is incorrect.")];
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
            var checkIfPersonaExists, newID, recoveryId, location;
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
                        return [4 /*yield*/, cypher_1.cypher.hash(password + username, Number(strength.toString())).then(function (hash) { return __awaiter(_this, void 0, void 0, function () {
                                var newRes;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0:
                                            this.username = username;
                                            this.password = password;
                                            this.key = password + username;
                                            this.current = {
                                                id: newID,
                                                username: cypher_1.cypher.encrypt(username, this.key),
                                                password: hash,
                                                strength: strength,
                                                profile: cypher_1.cypher.encrypt("{\"firstName\":\"\", \"lastName\":\"\"}", this.key),
                                                mfa: "none",
                                                recovery: cypher_1.cypher.encrypt(this.key, recoveryId),
                                                link: []
                                            };
                                            return [4 /*yield*/, this.addRecentListItem({ id: newID, username: username, avatar: null, location: location })];
                                        case 1:
                                            _a.sent();
                                            return [4 /*yield*/, generic_1.generic.fileUpdate(location, "" + config_1.defaults.root, JSON.stringify(this.current))];
                                        case 2:
                                            newRes = _a.sent();
                                            this.login();
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
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path + "\\" + this.current.id, "" + config_1.defaults.root, JSON.stringify(this.current))];
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
            var key, files, id;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        key = password + username;
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
                                            return [4 /*yield*/, generic_1.generic.fileLoad(personaFolder + "\\" + config_1.defaults.root)];
                                        case 1:
                                            rootFile = _b.apply(_a, [_c.sent()]);
                                            return [2 /*return*/, username === cypher_1.cypher.decrypt(rootFile.username, key)];
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
    return persona;
}());
exports.persona = persona;
//# sourceMappingURL=index.js.map