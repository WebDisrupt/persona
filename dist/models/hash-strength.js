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
/*
export enum hashStrength {
    wimpy = 12,
    weak = 13,
    medium = 14,
    strong = 15,
    secure = 16,
    secureII = 17,
    secureIII = 18,
    secureIV = 19,
    secureV = 20
}
export let hashStrengthDetails = [
    {name : "wimpy", value: hashStrength.wimpy, desc: "A hacker can check password 4 times per second."},
    {name : "weak", value: hashStrength.weak, desc: "A hacker can check password 2 times per second."},
    {name : "medium", value: hashStrength.medium, desc: "A hacker can check password 1 time every second."},
    {name : "strong", value: hashStrength.strong, desc: "A hacker can check password 1 time every 2 second."},
    {name : "secure", value: hashStrength.secure, desc: "A hacker can check password 1 time every 4 second."},
    {name : "secureII", value: hashStrength.secureII, desc: "A hacker can check password 1 time every 8 second."},
    {name : "secureIII", value: hashStrength.secureIII, desc: "A hacker can check password 1 time every 16 second."},
    {name : "secureIV", value: hashStrength.secureIV, desc: "A hacker can check password 1 time every 30 second."},
    {name : "secureV", value: hashStrength.secureV, desc: "A hacker can check password 1 time every minute."},
]; */ 
//# sourceMappingURL=hash-strength.js.map