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
exports.generic = void 0;
var fs = require("fs");
var uuid = require('uuid-random');
var generic = /** @class */ (function () {
    function generic() {
    }
    /**
     * Generate a random unique id or perform a partial match on a list to ensure it is unique.
     * @param list - Perform a partial match on a list to see if it already exists
     * @returns
     */
    generic.generateUniqueID = function (list) {
        if (list === void 0) { list = []; }
        var uniqueId = uuid();
        if (list.length === 0) {
            return uniqueId;
        }
        else {
            while (list.some(function (item) { return item.includes(uniqueId); })) {
                uniqueId = uuid();
            }
            ;
            return uniqueId;
        }
    };
    /**
     * Save updates to an existing file. If that files doesn't exsist then it creates the file and recursive folder structure.
     * @param path - path to file
     * @param filename - filename + extenton
     * @param data - The content to be saved
     * @returns true or error
     */
    generic.fileUpdate = function (path, filename, data) {
        return __awaiter(this, void 0, void 0, function () {
            var errorMsg;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        errorMsg = "Failed to save file, please make sure this Application has the correct permissions.";
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
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
                                            return [2 /*return*/];
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
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Load content from a file if it exists.
     * @param filename - path + filename + extenton
     * @returns file contents or error
     */
    generic.fileLoad = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, new Promise(function (resolve, reject) {
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
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns
     */
    generic.asyncSome = function (arr, predicate) { return __awaiter(void 0, void 0, void 0, function () {
        var _i, arr_1, e;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, arr_1 = arr;
                    _a.label = 1;
                case 1:
                    if (!(_i < arr_1.length)) return [3 /*break*/, 4];
                    e = arr_1[_i];
                    return [4 /*yield*/, predicate(e)];
                case 2:
                    if (_a.sent())
                        return [2 /*return*/, true];
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, false];
            }
        });
    }); };
    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns
     */
    generic.asyncFind = function (arr, predicate) { return __awaiter(void 0, void 0, void 0, function () {
        var _i, arr_2, e;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _i = 0, arr_2 = arr;
                    _a.label = 1;
                case 1:
                    if (!(_i < arr_2.length)) return [3 /*break*/, 4];
                    e = arr_2[_i];
                    return [4 /*yield*/, predicate(e)];
                case 2:
                    if (_a.sent())
                        return [2 /*return*/, e];
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3 /*break*/, 1];
                case 4: return [2 /*return*/, null];
            }
        });
    }); };
    return generic;
}());
exports.generic = generic;
//# sourceMappingURL=generic.js.map