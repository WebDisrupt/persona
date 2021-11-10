"use strict";
exports.__esModule = true;
exports.BaseModule = void 0;
var BaseModule = /** @class */ (function () {
    /**
     * Constructor - Used to assign core data
     * @param options
     */
    function BaseModule(options) {
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
    return BaseModule;
}());
exports.BaseModule = BaseModule;
//# sourceMappingURL=module.js.map