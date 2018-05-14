md5 = require('js-md5');
sha1 = require('sha1');
sha256 = require('sha256');
sha512 = require('sha512');


class Hash {
    constructor(word){
        this.word = word 
    }

    md5(){
        this.word = md5(this.word);
        return this.word
    }

    sha1(){
        this.word = sha1(this.word);
        return this.word
    }

    sha256(){
        this.word = sha256(this.word);
        return this.word
    }

    sha512(){
        this.word = sha512(this.word);
        return this.word
    }
} // end class Hash


let _md5 = new Hash('adyasa')
console.log(_md5.md5());

let _sha1 = new Hash('adyasa')
console.log(_sha1.sha1());

let _sha256 = new Hash('adyasa')
console.log(_sha256.sha256());

let _sha512 = new Hash('adyasa')
console.log(_sha512.sha512());
