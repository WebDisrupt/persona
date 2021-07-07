export interface cypher {
    encrypt : (text:string, key:string) => string,
    decrypt : (text:string, key:string) => string,
    hash : (password:string, saltRounds:number) => Promise<string>,
    verify : (password:string, hash:string) => Promise<boolean>,
    generateRecoveryCode : () => string
}