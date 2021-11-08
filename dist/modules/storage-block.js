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
exports.StorageBlock = void 0;
var generic_1 = require("../helpers/generic");
var cypher_1 = require("../helpers/cypher");
var config_1 = require("../config");
var response_1 = require("../helpers/response");
var fs = require("fs");
var StorageBlock = /** @class */ (function () {
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    function StorageBlock(options) {
        if (options === void 0) { options = null; }
        this.path = null;
        this.appName = null;
        this.personaId = null;
        this.key = null;
        this.path = options.path;
        this.appName = options.appName;
        this.personaId = options.personaId;
        this.key = options.key;
    }
    /**
     * Check if storage block exists
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns {boolean}
     */
    StorageBlock.prototype.exists = function (storageBlockId) {
        return fs.existsSync(this.path + "\\" + this.personaId + "\\" + this.appName + "." + storageBlockId + config_1.defaults.blockExt) ? true : false;
    };
    /**
     * Loads a block of data form an existing block.
     * @param storageBlockId The id property is required to identify the blocks purpose and if it already exists. Cannot contain '|' chaacter.
     * @returns
     */
    StorageBlock.prototype.load = function (storageBlockId) {
        return __awaiter(this, void 0, void 0, function () {
            var filename;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = this.appName + "." + storageBlockId + config_1.defaults.blockExt;
                        if (!this.exists(storageBlockId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, generic_1.generic.fileLoad(this.path + "\\" + this.personaId + "\\" + filename).then(function (content) { return __awaiter(_this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    return [2 /*return*/, response_1.response.success("Data storage block " + storageBlockId + " was loaded successfully.", cypher_1.cypher.decrypt(content.toString(), this.key))];
                                });
                            }); })];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/, response_1.response.failed("Data storage block " + storageBlockId + " doesn't exist.", this.path + "\\" + this.personaId + "\\" + filename)];
                }
            });
        });
    };
    /**
     * Loads multiple storage blocks fluidly and assigns any storage block found to the corresponding objectMap property.
     * @param objectMap An object, it will always try to load storage block for every property. If it fails then it will perserve the currently assigned data.
     * @returns passes back a new object that mimics the previous
     */
    StorageBlock.prototype.loadAll = function (objectMap) {
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
    StorageBlock.prototype.save = function (storageBlockId, content) {
        return __awaiter(this, void 0, void 0, function () {
            var filename, newRes, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (typeof content !== "string")
                            content = JSON.stringify(content);
                        filename = this.appName + "." + storageBlockId + config_1.defaults.blockExt;
                        if (this.personaId === null)
                            return [2 /*return*/, response_1.response.failed("No profile loaded.")];
                        if (storageBlockId === undefined || storageBlockId === null)
                            return [2 /*return*/, response_1.response.failed("No storage id provided.")];
                        if (!this.exists(storageBlockId)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.update(filename, content)];
                    case 1:
                        _a = _b.sent();
                        return [3 /*break*/, 4];
                    case 2: return [4 /*yield*/, this.create(filename, content)];
                    case 3:
                        _a = _b.sent();
                        _b.label = 4;
                    case 4:
                        newRes = _a;
                        if (newRes.status === true) {
                            return [2 /*return*/, response_1.response.success("Data storage block " + filename + " was saved successfully.")];
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
    StorageBlock.prototype.create = function (filename, content) {
        return __awaiter(this, void 0, void 0, function () {
            var personaLocation, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        personaLocation = this.path + "\\" + this.personaId;
                        return [4 /*yield*/, generic_1.generic.fileUpdate(personaLocation, "" + filename, cypher_1.cypher.encrypt(content, this.key))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response_1.response.success("Data storage block successfully created.")];
                    case 2:
                        err_2 = _a.sent();
                        return [2 /*return*/, response_1.response.failed("Data storage block " + filename + " failed to create successfully.")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Updates an existing Storage block
     * @param id - contains a | seperated string. Example: filename|app_id|block_ref_id
     * @param content - contains a string of important data that is saved
     */
    StorageBlock.prototype.update = function (filename, content) {
        return __awaiter(this, void 0, void 0, function () {
            var err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path + "\\" + this.personaId, "" + filename, cypher_1.cypher.encrypt(content, this.key))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, response_1.response.success("Data storage block " + filename + " successfully updated.")];
                    case 2:
                        err_3 = _a.sent();
                        return [2 /*return*/, response_1.response.failed("Data storage block " + filename + " failed to update successfully.")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Delete a storage block
     * @param storageBlockId (optional) - Define to delete an individual storage block or leave empty to delete all storage blocks. Cannot contain '|' chaacter.
     */
    StorageBlock.prototype["delete"] = function (storageBlockId) {
        if (storageBlockId === void 0) { storageBlockId = null; }
        return __awaiter(this, void 0, void 0, function () {
            var filename, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        filename = this.appName + "." + storageBlockId + config_1.defaults.blockExt;
                        if (!(this.personaId !== null)) return [3 /*break*/, 4];
                        if (!(storageBlockId === null)) return [3 /*break*/, 2];
                        return [4 /*yield*/, fs.promises.readdir(this.path + "\\" + this.personaId)];
                    case 1:
                        files = _a.sent();
                        try {
                            files.forEach(function (file) {
                                if (file !== "" + config_1.defaults.root) {
                                    fs.unlinkSync(_this.path + "\\" + _this.personaId + "\\" + file);
                                }
                            });
                            return [2 /*return*/, response_1.response.success("Successfully deleted all storage blocks.")];
                        }
                        catch (_b) {
                            return [2 /*return*/, response_1.response.failed("Could not find any storage blocks to delete.")];
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        try {
                            fs.unlinkSync(this.path + "\\" + this.personaId + "\\" + filename);
                            return [2 /*return*/, response_1.response.success("Successfully deleted data storage block.[" + filename + "]")];
                        }
                        catch (err) {
                            return [2 /*return*/, response_1.response.failed("Failed to find the data storage block.[" + filename + "]")];
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4: return [2 /*return*/, response_1.response.failed("Failed to delete data storage block(s) because no Persona was found.")];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    /**
    * Gets all the storage block that are defined inside the current Persona.
    * @returns A list with name and path properties of all storageblocks.
    */
    StorageBlock.prototype.getList = function () {
        return __awaiter(this, void 0, void 0, function () {
            var newLinkList, files;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (this.personaId === null)
                            return [2 /*return*/, response_1.response.failed("Can't list storage blocks, please login.", [])];
                        newLinkList = [];
                        return [4 /*yield*/, fs.promises.readdir(this.path + "\\" + this.personaId)];
                    case 1:
                        files = _a.sent();
                        try {
                            files.forEach(function (file) {
                                if (file.includes("" + config_1.defaults.blockExt)) {
                                    newLinkList.push({ name: file, path: _this.path + "\\" + _this.personaId + "\\" + file });
                                }
                            });
                            return [2 /*return*/, response_1.response.success("All storage blocks were found.", newLinkList)];
                        }
                        catch (_b) {
                            return [2 /*return*/, response_1.response.failed("Failed getting current list of files.", [])];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return StorageBlock;
}());
exports.StorageBlock = StorageBlock;
//# sourceMappingURL=storage-block.js.map