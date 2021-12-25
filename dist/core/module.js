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
exports.BaseModule = void 0;
var generic_1 = require("../helpers/generic");
var config_1 = require("../config");
var BaseModule = /** @class */ (function () {
    /**
     * Constructor - Used to assign core data
     * @param options
     */
    function BaseModule(options) {
        if (options === void 0) { options = null; }
        this.moduleData = config_1.defaults.system;
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
     *  Gets the full list of cache items saved
     */
    BaseModule.prototype.getAllCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a, _b, _c;
            return __generator(this, function (_d) {
                switch (_d.label) {
                    case 0:
                        _d.trys.push([0, 2, , 3]);
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, generic_1.generic.fileLoad("".concat(this.path, "\\").concat(config_1.defaults.cache))];
                    case 1: return [2 /*return*/, _b.apply(_a, [_d.sent()])];
                    case 2:
                        _c = _d.sent();
                        return [2 /*return*/, null];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get a specified cache value
     * @param key
     * @returns name value pair or null if not found
     */
    BaseModule.prototype.getCache = function (key) {
        if (key === void 0) { key = null; }
        return __awaiter(this, void 0, void 0, function () {
            var cachList;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCache()];
                    case 1:
                        cachList = _a.sent();
                        if (cachList != null) {
                            return [2 /*return*/, cachList.find(function (item) { return item.key === _this.uKey(key); })];
                        }
                        else {
                            return [2 /*return*/, null];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Set Cache saves a new name value pair into a cache file located by system defaults.
     * Only should be used for storing non-critical / non-encrypted data to increase performance or add logging.
     * @param key
     * @param value
     * @returns true or error
     */
    BaseModule.prototype.setCache = function (key, value) {
        return __awaiter(this, void 0, void 0, function () {
            var cachList, entryIndex;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getAllCache()];
                    case 1:
                        cachList = _a.sent();
                        entryIndex = cachList ? cachList.findIndex(function (item) { return item.key === _this.uKey(key); }) : -1;
                        if (!(cachList != null)) return [3 /*break*/, 3];
                        if (entryIndex === -1) {
                            cachList.push({ "key": this.uKey(key), "value": value });
                        }
                        else {
                            cachList[entryIndex] = { "key": this.uKey(key), "value": value };
                        }
                        return [4 /*yield*/, generic_1.generic.fileUpdate(this.path, "".concat(config_1.defaults.cache), JSON.stringify(cachList))];
                    case 2: return [2 /*return*/, _a.sent()];
                    case 3: return [4 /*yield*/, generic_1.generic.fileUpdate(this.path, "".concat(config_1.defaults.cache), JSON.stringify([{ "key": this.uKey(key), "value": value }]))];
                    case 4: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    /**
     * Add the personaId to make the key unique per user
     * @param key
     * @returns
     */
    BaseModule.prototype.uKey = function (key) {
        return "".concat(this.personaId, ":").concat(key);
    };
    return BaseModule;
}());
exports.BaseModule = BaseModule;
//# sourceMappingURL=module.js.map