export enum hashStrength {
    weak = 1,
    medium = 2,
    strong = 3,
    secure = 4,
    fortKnox = 5,
    area51 = 6
}
export let hashStrengthDetails = [
    {name : "weak", value: hashStrength.weak, desc: "A hacker can check password 4 times per second."},
    {name : "medium", value: hashStrength.medium, desc: "A hacker can check password 2 times per second."},
    {name : "strong", value: hashStrength.strong, desc: "A hacker can check password 1 time every second."},
    {name : "secure", value: hashStrength.secure, desc: "A hacker can check password 1 time every 4 second."},
    {name : "fortKnox", value: hashStrength.fortKnox, desc: "A hacker can check password 1 time every 8 second."},
    {name : "area51", value: hashStrength.area51, desc: "A hacker can check password 1 time every 8 second."}
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