"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.cypher = void 0;
var CryptoJS = require("crypto-js");
var argon2 = __importStar(require("argon2"));
var password = require('secure-random-password');
var cypher = (function () {
    function cypher() {
    }
    cypher.getKey = function (key) {
        return key.length <= 32 ? key + this.ENCRYPTION_KEY.slice(key.length) : key.slice(0, 32);
    };
    cypher.encrypt = function (text, key) {
        if (key === void 0) { key = ""; }
        key = this.getKey(key);
        var encrypted = CryptoJS.AES.encrypt(text, key).toString();
        if (this.debug)
            console.log("encrypt -> input: ", text);
        if (this.debug)
            console.log("encrypt -> output: ", encrypted);
        if (this.debug)
            return text;
        return encrypted;
    };
    cypher.decrypt = function (text, key) {
        if (key === void 0) { key = ""; }
        var decrypted;
        key = this.getKey(key);
        try {
            decrypted = CryptoJS.AES.decrypt(text, key);
        }
        catch (err) {
            decrypted = "";
        }
        try {
            if (this.debug)
                console.log("decrypt -> input: ", text);
            if (this.debug)
                console.log("decrypt -> output: ", CryptoJS.enc.Utf8.stringify(decrypted));
            if (this.debug)
                return text;
            return CryptoJS.enc.Utf8.stringify(decrypted);
        }
        catch (err) {
            if (this.debug)
                console.log("decrypt -> failed: ", err);
            if (this.debug)
                return text;
            return "";
        }
    };
    cypher.hash = function (password, strength) {
        if (strength === void 0) { strength = 3; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, argon2.hash(password, this.getStrength(strength))];
                    case 1: return [2, (_a.sent()).toString()];
                }
            });
        });
    };
    cypher.getStrength = function (value) {
        switch (value) {
            case 1:
                return { type: argon2.argon2id, parallelism: 2, timeCost: 2, memoryCost: 30000 };
                break;
            case 2:
                return { type: argon2.argon2id, parallelism: 5, timeCost: 5, memoryCost: 30000 };
                break;
            case 3:
                return { type: argon2.argon2id, parallelism: 10, timeCost: 10, memoryCost: 60000 };
                break;
            case 4:
                return { type: argon2.argon2id, parallelism: 25, timeCost: 25, memoryCost: 60000 };
                break;
            case 5:
                return { type: argon2.argon2id, parallelism: 50, timeCost: 50, memoryCost: 120000 };
                break;
            case 6:
                return { type: argon2.argon2id, parallelism: 100, timeCost: 100, memoryCost: 240000 };
                break;
        }
    };
    cypher.verify = function (password, hash) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, argon2.verify(hash, password)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    cypher.generateRecoveryCode = function () {
        return password.randomPassword({ length: 32 });
    };
    cypher.ENCRYPTION_KEY = "ZrzAamNi4zj7ivjDaTpbRcx8i5786cTr";
    cypher.debug = false;
    return cypher;
}());
exports.cypher = cypher;
//# sourceMappingURL=cypher.js.map