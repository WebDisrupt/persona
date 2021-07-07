import { cypher } from '../src/modules/cypher';

const key = "123kyle";

test("Encrypt and decrypt are still working. (key < 32 characters)", ()=>{
    const textInput = "Some data to encrypt.";
    const encrypted = cypher.encrypt(textInput, key);
    const decrypted = cypher.decrypt(encrypted, key);
    expect(decrypted).toBe(textInput);
}); 

test("Encrypt and decrypt are still working. (key > 32 characters)", ()=>{
    const textInput = "Some data to encrypt.";
    const longKey = "pasword1234567893kyle@webdisrupt.com";
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
