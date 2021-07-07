export class personaHelpers {

    /**
         *  How long it could take to theoretically crack your password
         * @param password - password used
         * @param strength - Strength of the password
         * @param hashPower - Processing power
         * @returns 
         */
     public static calculateCrackTime( password: string, strength:number, hashPower:number ) : string{
        let possibleCharacters = 0;
        let letters = 26;
        let capitalLetters = 26;
        let numbers = 10;
        let special = 33;
        // Detect if contain letter, number, special char and manipulate value
        for(let i = 0; i < password.length; i++){
            let character:any = password.charAt(i);
            if(/[\s~`!@#$%\^&*+=\-\[\]\\';,/{}|\\":<>\?()\._]/g.test(character)){
                possibleCharacters += special;
                special = 0;
            }
            else if (!isNaN(character * 1)){
                possibleCharacters += numbers;
                numbers = 0;
            } 
            else if (character == character.toLowerCase()){ 
                possibleCharacters += letters; 
                letters = 0;
            }
            else if (character == character.toUpperCase()){ 
                possibleCharacters += capitalLetters; 
                capitalLetters = 0;
            }
        }
        let totalTries = Math.pow(possibleCharacters, password.length);
        let totalTime = ( ( totalTries ) / 
           ( strength == 12 ? 4 :
            strength == 13 ? 2 :
            strength == 14 ? 1 : 
            strength == 15 ? .5 : 
            strength == 16 ? .25 : 
            strength == 17 ? .125 : 
            strength == 18 ? .065 : 
            strength == 19 ? .03125 : 
            strength == 20 ? .015625 : 0)) / 31536000; // 31536000 is a Years worth of seconds = 60 seconds * 60 minutes * 24 hours * 365 days
        totalTime /= hashPower; // Divided by processing power
        let postFix = " years.";
    
        // Convert to lower then years if equals 0
        if(Math.round(totalTime) == 0) {
            totalTime *= 365;
            if(Math.round(totalTime) == 0) {
                totalTime *= 24;
                postFix = " hours.";
            } else {
                postFix = " days.";
            }
        } else {
            let zeroCount = ((Math.round(totalTime)).toString().length) - 1;
            let prePostFix = "";
            switch(zeroCount){
                case 0: case 1: case 3:  prePostFix = ""; break;
                case 3:case 4:case 5:    prePostFix = "thousand";     totalTime /= Math.pow(10, 3); break;
                case 6:case 7:case 8:    prePostFix = "million";      totalTime /= Math.pow(10, 6); break;
                case 9:case 10:case 11:  prePostFix = "billion";      totalTime /= Math.pow(10, 9); break;
                case 12:case 13:case 14: prePostFix = "trillion";     totalTime /= Math.pow(10, 12); break;
                case 15:case 16:case 17: prePostFix = "quadrillion";   totalTime /= Math.pow(10, 15); break;
                case 18:case 19:case 20: prePostFix = "quintrillion"; totalTime /= Math.pow(10, 18); break;
                case 21:case 22:case 23: prePostFix = "sextillion";   totalTime /= Math.pow(10, 21); break;
                case 24:case 25:case 26: prePostFix = "septillion";   totalTime /= Math.pow(10, 24); break;
                case 27:case 28:case 29: prePostFix = "octillion";    totalTime /= Math.pow(10, 27); break;
                case 30:case 31:case 32: prePostFix = "nonillion";    totalTime /= Math.pow(10, 30); break;
                default:                 prePostFix = "decillion";    totalTime /= Math.pow(10, 33); break;
            }
            if(prePostFix.length != 0){
                postFix = ` ${prePostFix} years.`;
            }
        }
        return BigInt(Math.round(totalTime)).toString().replace(/(\d)(?=(\d{3})+$)/g, '$1,') + postFix;
    }

}