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
var index_1 = require("../src/index");
var fs = require("fs");
// TODO change the persona root calls to add correct response 
// Add multi-storage loading function
var username = "john@doe.com";
var password = "123456";
var personaInstance = new index_1.persona({ appName: "default-app" });
beforeEach(function () {
    return personaInstance.create(username, password, 1);
});
afterEach(function () {
    return personaInstance["delete"](username, password);
});
/// Persona Actions
test("Create new Persona and load it", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = expect;
                return [4 /*yield*/, personaInstance.load(username, password)];
            case 1:
                _a.apply(void 0, [_b.sent()]).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test("Update a Persona", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                // TODO Create update and save to check it
                _a = expect;
                return [4 /*yield*/, personaInstance.save()];
            case 1:
                // TODO Create update and save to check it
                _a.apply(void 0, [_b.sent()]).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
test("Check recently loaded list.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var recentlyLoadedPersonas;
    return __generator(this, function (_a) {
        recentlyLoadedPersonas = personaInstance.getRecentList();
        expect(recentlyLoadedPersonas[0].username).toBe(username);
        return [2 /*return*/];
    });
}); });
test("unload persona", function () {
    expect(personaInstance.unload().status).toBe(true);
});
test("Delete a persona that dsoes exist", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, personaInstance["delete"](username, password)];
            case 1:
                _b.sent();
                _a = expect;
                return [4 /*yield*/, personaInstance.load(username, password)];
            case 2:
                _a.apply(void 0, [_b.sent()]).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
test("Delete a persona that doesn't exist", function () { return __awaiter(void 0, void 0, void 0, function () {
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, personaInstance["delete"](username, password)];
            case 1:
                _b.sent();
                _a = expect;
                return [4 /*yield*/, personaInstance["delete"](username, password)];
            case 2:
                _a.apply(void 0, [_b.sent()]).toBe(false);
                return [2 /*return*/];
        }
    });
}); });
/// Persona Data Storage Actions
test("Save and load a single data storage block.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var thisId, thisContent, _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                thisId = "example-data-block";
                thisContent = JSON.stringify({ "data": "The text you want to save" });
                return [4 /*yield*/, personaInstance.saveStorageBlock(thisId, thisContent)];
            case 1:
                _b.sent();
                _a = expect;
                return [4 /*yield*/, personaInstance.loadStorageBlock(thisId)];
            case 2:
                _a.apply(void 0, [(_b.sent()).data]).toBe(thisContent);
                return [2 /*return*/];
        }
    });
}); });
test("Update a single data storage block.", function () { return __awaiter(void 0, void 0, void 0, function () {
    var thisId, thisContent, thisContent2, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                thisId = "example-data-block";
                thisContent = JSON.stringify({ "data": "The text you want to save" });
                thisContent2 = JSON.stringify({ "data": "The text you want to save 2" });
                return [4 /*yield*/, personaInstance.saveStorageBlock(thisId, thisContent)];
            case 1:
                _c.sent();
                _a = expect;
                return [4 /*yield*/, personaInstance.saveStorageBlock(thisId, thisContent2)];
            case 2:
                _a.apply(void 0, [(_c.sent()).status]).toBe(true);
                _b = expect;
                return [4 /*yield*/, personaInstance.loadStorageBlock(thisId)];
            case 3:
                _b.apply(void 0, [(_c.sent()).data]).toBe(thisContent2);
                return [2 /*return*/];
        }
    });
}); });
test("Delete a data storage block(s)", function () { return __awaiter(void 0, void 0, void 0, function () {
    var thisId, thisId2, thisContent, _a, _b;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                thisId = "example-data-block";
                thisId2 = "example-data-block2";
                thisContent = JSON.stringify({ "data": "The text you want to save" });
                return [4 /*yield*/, personaInstance.saveStorageBlock(thisId, thisContent)];
            case 1:
                _c.sent();
                _a = expect;
                return [4 /*yield*/, personaInstance.deleteStorageBlock(thisId)];
            case 2:
                _a.apply(void 0, [(_c.sent()).status]).toBe(true);
                return [4 /*yield*/, personaInstance.saveStorageBlock(thisId, thisContent)];
            case 3:
                _c.sent();
                return [4 /*yield*/, personaInstance.saveStorageBlock(thisId2, thisContent)];
            case 4:
                _c.sent();
                _b = expect;
                return [4 /*yield*/, personaInstance.deleteStorageBlock()];
            case 5:
                _b.apply(void 0, [(_c.sent()).status]).toBe(true);
                return [2 /*return*/];
        }
    });
}); });
//# sourceMappingURL=persona.test.js.map