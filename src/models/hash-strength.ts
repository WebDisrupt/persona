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