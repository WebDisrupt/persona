var fs = require("fs");
let uuid = require('uuid-random');

export class generic {


    /**
     * Generate a random unique id or perform a partial match on a list to ensure it is unique.
     * @param list - Perform a partial match on a list to see if it already exists
     * @returns 
     */
    public static generateUniqueID(list:Array<string> = []){
        let uniqueId = uuid();
        if(list.length === 0) {
            return uniqueId;
        } else {
            while ( list.some( (item : string) => {  return item.includes(uniqueId) }) ) { uniqueId = uuid() };
            return uniqueId;
        }
    }
    
    /**
     * Save updates to an existing file. If that files doesn't exsist then it creates the file and recursive folder structure.
     * @param path - path to file
     * @param filename - filename + extenton
     * @param data - The content to be saved
     * @returns true or error
     */
     public static async fileUpdate(path:string, filename:string, data:string) :  Promise<any>{
        let errorMsg = "Failed to save file, please make sure this Application has the correct permissions.";
        return await new Promise(function(resolve, reject) {
            if(!fs.existsSync(path)){
                fs.mkdir(path, { recursive: true }, async (err:Error) => {
                    if(err){ reject(errorMsg); }
                    fs.writeFile(`${path}\\${filename}`, data, (err:Error) => { 
                        if(err){ reject(errorMsg); }
                        resolve(true);
                    });
                });
            } else {   
                fs.writeFile(`${path}\\${filename}`, data, (err:Error) => { 
                    if(err){ reject(errorMsg); }
                    resolve(true);
                });     
            }
        });
    }


    /**
     * Load content from a file if it exists.
     * @param filename - path + filename + extenton
     * @returns file contents or error
     */
    public static async fileLoad(filename:string) :  Promise<string>{
        return await new Promise(function(resolve, reject) {
        if(fs.existsSync(filename)){ 
            fs.readFile(filename, (err:Error, file:string) => { 
                if(err){ reject(err); }
                resolve(file);
            });     
        } else {
            reject(new Error( "Cannot find the file you specified." ));
        }
        });

    }

    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns 
     */
     public static asyncSome = async (arr:any, predicate:any) => {
        for (let e of arr) {
            if (await predicate(e)) return true;
        }
        return false;
    };

    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns 
     */
     public static asyncFind = async (arr:any, predicate:any) => {
        for (let e of arr) {
            if (await predicate(e)) return e;
        }
        return null;
    };

}