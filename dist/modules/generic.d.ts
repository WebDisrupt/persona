export declare class generic {
    /**
     * Generate random unique userd id
     * @returns
     */
    static generateUUID(): any;
    /**
     * Save updates to an existing file. If that files doesn't exsist then it creates the file and recursive folder structure.
     * @param path - path to file
     * @param filename - filename + extenton
     * @param data - The content to be saved
     * @returns true or error
     */
    static fileUpdate(path: string, filename: string, data: string): Promise<any>;
    /**
     * Load content from a file if it exists.
     * @param filename - path + filename + extenton
     * @returns file contents or error
     */
    static fileLoad(filename: string): Promise<string>;
    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns
     */
    static asyncSome: (arr: any, predicate: any) => Promise<boolean>;
    /**
     * Performs an async version of array.some passing in an array and the function
     * @param arr - Array to be iterated on
     * @param predicate - Function
     * @returns
     */
    static asyncFind: (arr: any, predicate: any) => Promise<any>;
}
