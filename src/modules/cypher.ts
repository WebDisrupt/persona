// The hashing and Encryption used to secure persona details
var CryptoJS = require("crypto-js");
import * as argon2 from 'argon2';
const password = require('secure-random-password');

export class cypher {

    private static ENCRYPTION_KEY : string = "ZrzAamNi4zj7ivjDaTpbRcx8i5786cTr";
    private static readonly debug : boolean = false;

    /**
     * Perpares key for use
     * @param key 
     * @returns 32 character key with most important factors taking precident
     */
    private static getKey(key:string){
        return key.length <= 32 ? key + this.ENCRYPTION_KEY.slice(key.length) : key.slice(0, 32);
    }

    /**
     * Encrypt using secure encryption process
     * @param text - String to encrypt
     * @param key - Key used to dynamically strengthen encryption
     * @returns
     */
    public static encrypt(text:string, key:string = "") {
        key = this.getKey(key);
        let encrypted = CryptoJS.AES.encrypt(text, key).toString();
        if(this.debug) console.log("encrypt -> input: ", text);
        if(this.debug) console.log("encrypt -> output: ", encrypted);
        if(this.debug) return text;
        return encrypted;
    }

    /**
     * Decrypt using secure encryption process. If it fails then return an empty string.
     * @param text - String to decrypt
     * @param key - Key used to dynamically strengthen encryption
     * @returns 
     */
    public static decrypt(text:string, key:string = "") {
        let decrypted;
        key = this.getKey(key);
        try {
            decrypted = CryptoJS.AES.decrypt(text, key);
        } catch(err){
            decrypted = "";
        }
        try{
            if(this.debug) console.log("decrypt -> input: ", text);
            if(this.debug) console.log("decrypt -> output: ", CryptoJS.enc.Utf8.stringify(decrypted));
            if(this.debug) return text;
            return CryptoJS.enc.Utf8.stringify(decrypted);
        } catch(err){
            if(this.debug) console.log("decrypt -> failed: ", err);
            if(this.debug) return text;
            return "";
        }
    }

     /**
     * Uses Bcrypt to create a secure irreversible hash
     * @param password - User supplied password
     * @param saltRounds Optional - defines the complexity
     * @returns 
     */   
     public static async hash(password : string, strength: number = 3){
        //return await bcrypt.hash(password, saltRounds);
        return (await argon2.hash(password, this.getStrength(strength))).toString();
    }

    private static getStrength(value:number) : any{
       switch(value){
        case 1: return { type: argon2.argon2id, parallelism: 2, timeCost: 2, memoryCost: 30000  }; break;
        case 2: return { type: argon2.argon2id, parallelism: 5, timeCost: 5, memoryCost: 30000  }; break;
        case 3: return { type: argon2.argon2id, parallelism: 10, timeCost: 10, memoryCost: 60000  }; break;
        case 4: return { type: argon2.argon2id, parallelism: 25, timeCost: 25, memoryCost: 60000  }; break;
        case 5: return { type: argon2.argon2id, parallelism: 50, timeCost: 50, memoryCost: 120000  }; break;
        case 6: return { type: argon2.argon2id, parallelism: 100, timeCost: 100, memoryCost: 240000  }; break;
       }
    }

    /**
     * Verify with Bcrypt to check if it is correct
     * @param password - User supplied password
     * @param hash - Hash to compare against
     * @returns 
     */   
    public static async verify(password : string, hash: string){
        //return bcrypt.compare(password, hash);
        return await argon2.verify(hash, password);
    }

    /**
     * Generate random recovery code which will allow the user to unlock his acees to persona
     */
    public static generateRecoveryCode() : string {
        return password.randomPassword({ length: 32 });
    }

}