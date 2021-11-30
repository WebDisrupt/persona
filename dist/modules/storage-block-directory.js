"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.StorageBlockDirectory = void 0;
var generic_1 = require("../helpers/generic");
var config_1 = require("../config");
var response_1 = require("../helpers/response");
var storage_block_core_1 = require("../core/storage-block-core");
var recursive = require("recursive-readdir");
var fs = require("fs");
var StorageBlockDirectory = /** @class */ (function (_super) {
    __extends(StorageBlockDirectory, _super);
    /**
     * Constructor - Used to assign personaOptions.
     * @param options
     */
    function StorageBlockDirectory(options) {
        if (options === void 0) { options = null; }
        var _this = _super.call(this, options) || this;
        _this.progressTracker = [];
        return _this;
    }
    /**
     * Save the entire file structure inside a directory to a storage block. Does not save empty directories
     * @param directoryPath - Directory you would like to save
     * @param storageBlockName
     */
    StorageBlockDirectory.prototype.save = function (directoryPath, storageBlockName, clearDirectory) {
        var _a;
        if (clearDirectory === void 0) { clearDirectory = false; }
        return __awaiter(this, void 0, void 0, function () {
            var previousVersion, newVersion, fileDirectory, directoryContent, index, name_1, _b, _c, _d, response;
            var _e;
            return __generator(this, function (_f) {
                switch (_f.label) {
                    case 0: return [4 /*yield*/, this.load(storageBlockName)];
                    case 1:
                        previousVersion = ((_a = (_f.sent()).data) === null || _a === void 0 ? void 0 : _a.version) || 0;
                        newVersion = (previousVersion + 1);
                        this.setProgress(storageBlockName);
                        return [4 /*yield*/, recursive(directoryPath)];
                    case 2:
                        fileDirectory = _f.sent();
                        directoryContent = [];
                        index = 0;
                        _f.label = 3;
                    case 3:
                        if (!(index < fileDirectory.length)) return [3 /*break*/, 8];
                        this.setProgress(storageBlockName, Math.round((index / fileDirectory.length) * 100));
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
                    case 8:
                        this.setProgress(storageBlockName, 100);
                        return [4 /*yield*/, _super.prototype.save.call(this, storageBlockName, { type: "dir", version: newVersion, path: directoryPath, files: directoryContent })];
                    case 9:
                        response = _f.sent();
                        if (!response.status) return [3 /*break*/, 11];
                        return [4 /*yield*/, this.setVersionFile(storageBlockName, newVersion)];
                    case 10:
                        _f.sent();
                        _f.label = 11;
                    case 11:
                        if (!clearDirectory) return [3 /*break*/, 13];
                        return [4 /*yield*/, this.removeDirectory(storageBlockName)];
                    case 12:
                        _f.sent();
                        _f.label = 13;
                    case 13: return [2 /*return*/, response];
                }
            });
        });
    };
    /**
     * Create a new directory baed on a storage block
     * @param storageBlockName - Unique Storage block
     * @param newLocation - (optional) Used for moving files to a new location.
     */
    StorageBlockDirectory.prototype.load = function (storageBlockName, newLocation) {
        if (newLocation === void 0) { newLocation = null; }
        return __awaiter(this, void 0, void 0, function () {
            var fileDirectory, files, thisPath, _a, index, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 12, , 13]);
                        this.setProgress(storageBlockName);
                        return [4 /*yield*/, _super.prototype.load.call(this, storageBlockName)];
                    case 1:
                        fileDirectory = _c.sent();
                        fileDirectory.data = JSON.parse(fileDirectory.data);
                        files = fileDirectory.data.files;
                        thisPath = newLocation !== null ? newLocation : fileDirectory.data.path;
                        if (!fileDirectory.status) return [3 /*break*/, 10];
                        _a = Number(fileDirectory.data.version);
                        return [4 /*yield*/, this.getVersionFile(storageBlockName)];
                    case 2:
                        if (!(_a > (_c.sent()))) return [3 /*break*/, 8];
                        index = 0;
                        _c.label = 3;
                    case 3:
                        if (!(index < files.length)) return [3 /*break*/, 6];
                        this.setProgress(storageBlockName, Math.round((index / files.length) * 100));
                        return [4 /*yield*/, generic_1.generic.fileUpdate(files[index].path.replace(fileDirectory.data.path, thisPath), files[index].name, files[index].content)];
                    case 4:
                        _c.sent();
                        _c.label = 5;
                    case 5:
                        index++;
                        return [3 /*break*/, 3];
                    case 6:
                        this.setProgress(storageBlockName, 100);
                        return [4 /*yield*/, this.setVersionFile(storageBlockName, Number(fileDirectory.data.version))];
                    case 7:
                        _c.sent();
                        return [2 /*return*/, response_1.response.success("Directory " + thisPath + " successfully loaded from storage block.")];
                    case 8: return [2 /*return*/, response_1.response.failed("Loaded version is greater please save progress of " + storageBlockName + ".")];
                    case 9: return [3 /*break*/, 11];
                    case 10: return [2 /*return*/, response_1.response.failed("Data storage block called " + storageBlockName + " was found.")];
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        _b = _c.sent();
                        return [2 /*return*/, response_1.response.failed("Data storage block " + storageBlockName + " failed to load.")];
                    case 13: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Sets the directory loading progress based on storage block name.
     * @param storageBlockName - Unique Storage block
     */
    StorageBlockDirectory.prototype.setProgress = function (storageBlockName, progress) {
        if (progress === void 0) { progress = 0; }
        var currentIndex = this.progressTracker.findIndex(function (elem) { return elem.name === storageBlockName; });
        if (currentIndex === -1) {
            this.progressTracker.push({ name: storageBlockName, progress: progress });
        }
        else {
            this.progressTracker[currentIndex].progress = progress;
        }
    };
    /**
     * Gets current loading progress based on the provided storage block name.
     * @param storageBlockName - Unique Storage block
     * @returns percentage out of 100 that the directory has been loaded
     */
    StorageBlockDirectory.prototype.getProgress = function (storageBlockName) {
        return this.progressTracker[this.progressTracker.findIndex(function (elem) { return elem.name === storageBlockName; })].progress;
    };
    /**
     * Get storage block path based on storage block id
     * @param storageBlockName
     * @returns
     */
    StorageBlockDirectory.prototype.getDirectoryPath = function (storageBlockName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c, _d, _e, _f;
            return __generator(this, function (_g) {
                switch (_g.label) {
                    case 0:
                        _g.trys.push([0, 2, , 3]);
                        _b = (_a = response_1.response).success;
                        _c = ["The " + storageBlockName + " path was return successfully."];
                        _e = (_d = JSON).parse;
                        return [4 /*yield*/, _super.prototype.load.call(this, storageBlockName)];
                    case 1: return [2 /*return*/, _b.apply(_a, _c.concat([_e.apply(_d, [(_g.sent()).data]).path]))];
                    case 2:
                        _f = _g.sent();
                        return [2 /*return*/, response_1.response.failed("The " + storageBlockName + " storage block doesn't exist.")];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Storage Block Directory - Get version from the pstore.version file inside the directory
     * @param storageBlockName - Storage block that
     * @return New version
     */
    StorageBlockDirectory.prototype.getVersionFile = function (storageBlockName) {
        return __awaiter(this, void 0, void 0, function () {
            var thisPath, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getDirectoryPath(storageBlockName)];
                    case 1:
                        thisPath = (_c.sent()).data;
                        return [4 /*yield*/, fs.existsSync(thisPath + "\\" + config_1.defaults.versionName)];
                    case 2:
                        if (!(_c.sent())) return [3 /*break*/, 4];
                        _b = Number;
                        return [4 /*yield*/, generic_1.generic.fileLoad(thisPath + "\\" + config_1.defaults.versionName)];
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
     * @param storageBlockName - Storage block that
     * @param version - Set a new version, if empty increment by 1
     * @return New version
     */
    StorageBlockDirectory.prototype.setVersionFile = function (storageBlockName, version) {
        if (version === void 0) { version = null; }
        return __awaiter(this, void 0, void 0, function () {
            var thisPath, previousVersion, _a, _b, newVersion;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getDirectoryPath(storageBlockName)];
                    case 1:
                        thisPath = (_c.sent()).data;
                        previousVersion = 0;
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 4, , 5]);
                        _a = Number;
                        return [4 /*yield*/, generic_1.generic.fileLoad(thisPath + "\\" + config_1.defaults.versionName)];
                    case 3:
                        previousVersion = _a.apply(void 0, [_c.sent()]);
                        return [3 /*break*/, 5];
                    case 4:
                        _b = _c.sent();
                        return [3 /*break*/, 5];
                    case 5:
                        newVersion = version === null ? (previousVersion + 1).toString() : version.toString();
                        return [4 /*yield*/, generic_1.generic.fileUpdate(thisPath, config_1.defaults.versionName, newVersion)];
                    case 6:
                        _c.sent();
                        return [2 /*return*/, Number(newVersion)];
                }
            });
        });
    };
    /**
     * Removes a directory and all files inside that directory based on storage block name.
     * @param storageBlockName - Name of the storage block
     */
    StorageBlockDirectory.prototype.removeDirectory = function (storageBlockName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = fs).rmSync;
                        return [4 /*yield*/, this.getDirectoryPath(storageBlockName)];
                    case 1:
                        _b.apply(_a, [(_d.sent()).data, { recursive: true }]);
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
     * Checks if a directory exists based on the provided storage block name.
     * @param storageBlockName - Name of the storage block
     */
    StorageBlockDirectory.prototype.checkDirectory = function (storageBlockName) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = fs).existsSync;
                        return [4 /*yield*/, this.getDirectoryPath(storageBlockName)];
                    case 1:
                        if (_b.apply(_a, [(_d.sent()).data])) {
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
    return StorageBlockDirectory;
}(storage_block_core_1.BaseStorageBlock));
exports.StorageBlockDirectory = StorageBlockDirectory;
//# sourceMappingURL=storage-block-directory.js.map