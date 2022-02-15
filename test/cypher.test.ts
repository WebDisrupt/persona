import { cypher } from '../src/helpers/cypher';

const key = "123pass";
const textInput = "Some data to encrypt.";

test("Encrypt and decrypt are still working. (key < 32 characters)", ()=>{
    const encrypted = cypher.encrypt(textInput, key);
    const decrypted = cypher.decrypt(encrypted, key);
    expect(decrypted).toBe(textInput);
}); 

test("Encrypt and decrypt are still working. (key > 32 characters)", ()=>{
    const longKey = "pasword1234565464gh43454t4g45g57893password";
    const encrypted = cypher.encrypt(textInput, longKey);
    const decrypted = cypher.decrypt(encrypted, longKey);
    expect(decrypted).toBe(textInput);
});

test("Test that hash can be verified. ", async ()=>{
    let hash = await cypher.hash(key, 1);
    expect(hash).toBeDefined();
    const verify = await cypher.verify(key, hash);
    expect(verify).toBe(true);
});


test("Test all levels of Encryption.", async ()=>{
    for (let i = 2; i < 7; i++) {
        let hash = await cypher.hash(key, i);
        expect(hash).toBeDefined();
        const verify = await cypher.verify(key, hash);
        expect(verify).toBe(true);
    }
}, 100000);

test("Test encyption with a null key.", async ()=>{
    expect(() => { cypher.encrypt("Some data to encrypt.", null) }).toThrowError("Encryption key is null or undefined.");
}); 