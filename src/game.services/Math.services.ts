// const crypto = require("crypto");
import crypto from "crypto"
// let serverSeed = 23233434 ;
// let clientSeed = 459887 ;
// finalSeed = hash(serverSeed + clientSeed + nonce)
// randomNumber = hash(finalSeed)
// const seed = crypto.randomBytes(4).readUInt32BE(0);

// class PRNG {

//   constructor(seed) {
//     this.seed = seed;
//   }

//   next() {
       // console.log("This is the base seed value ", this.seed)
       // 1664525
       // 1013904223
       // 4,294,967,296   
       // this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
       // return this.seed;
//   }

//   nextInt(max) {
//     return this.next() % max;
//   }

// }

class Math{
    constructor( private seed : number){};
    changeSeed():any{
        this.seed = (this.seed * 1664525 + 1013904223) % 4294967296;
        return this.seed ;
    }
    generateStopIndex(max : number):number{
        return this.changeSeed() % max ;
    }
};

const seed = crypto.randomBytes(4).readUInt32BE(0);
const mathservice = new Math(seed);
export default mathservice;