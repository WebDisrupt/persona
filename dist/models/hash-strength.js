"use strict";
exports.__esModule = true;
exports.hashStrengthDetails = exports.hashStrength = void 0;
var hashStrength;
(function (hashStrength) {
    hashStrength[hashStrength["weak"] = 1] = "weak";
    hashStrength[hashStrength["medium"] = 2] = "medium";
    hashStrength[hashStrength["strong"] = 3] = "strong";
    hashStrength[hashStrength["secure"] = 4] = "secure";
    hashStrength[hashStrength["fortKnox"] = 5] = "fortKnox";
    hashStrength[hashStrength["area51"] = 6] = "area51";
})(hashStrength = exports.hashStrength || (exports.hashStrength = {}));
exports.hashStrengthDetails = [
    { name: "weak", value: hashStrength.weak, desc: "A hacker can check password 4 times per second." },
    { name: "medium", value: hashStrength.medium, desc: "A hacker can check password 2 times per second." },
    { name: "strong", value: hashStrength.strong, desc: "A hacker can check password 1 time every second." },
    { name: "secure", value: hashStrength.secure, desc: "A hacker can check password 1 time every 4 second." },
    { name: "fortKnox", value: hashStrength.fortKnox, desc: "A hacker can check password 1 time every 8 second." },
    { name: "area51", value: hashStrength.area51, desc: "A hacker can check password 1 time every 8 second." }
];
//# sourceMappingURL=hash-strength.js.map