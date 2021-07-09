"use strict";
exports.__esModule = true;
exports.response = void 0;
var response = (function () {
    function response() {
    }
    response.success = function (message, data) {
        if (data === void 0) { data = null; }
        return { status: true, message: message, data: data };
    };
    response.failed = function (message) {
        return { status: false, message: message };
    };
    return response;
}());
exports.response = response;
//# sourceMappingURL=response.js.map