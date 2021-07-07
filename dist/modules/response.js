"use strict";
exports.__esModule = true;
exports.response = void 0;
// Standard response objects used when returning details to user
var response = /** @class */ (function () {
    function response() {
    }
    /**
     * A successful response
     * @param message - Detailed message relevant to the status
     * @param data - (optional) used for passing back data
     * @returns [status, message, data]
     */
    response.success = function (message, data) {
        if (data === void 0) { data = null; }
        return { status: true, message: message, data: data };
    };
    /**
     * A failure response
     * @param message - Detailed message relevant to the status
     * @returns [status, message]
     */
    response.failed = function (message) {
        return { status: false, message: message };
    };
    return response;
}());
exports.response = response;
//# sourceMappingURL=response.js.map