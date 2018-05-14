class chiper{
  // constructor(string,pass){
  //   this.string = string;
  //   this.pas = pass;
  //}
  chip(string,pass){
     this.string = string;
     this.pass = pass;
     
    let result = "", code;
    for (let i=0; i<string.length;i++){
      if (string.charCodeAt(i)>=65 && string.charCodeAt(i)<=113){
        code = string.charCodeAt(i)+13;
      }
      else if (string.charCodeAt(i)>=114 && string.charCodeAt(i)<=126){
        code = string.charCodeAt(i)-13;
      }
       else if (string.charCodeAt(i)===32){
         code = 32;
       }
      result+=String.fromCharCode(code);
      this.result = result
    }
    return `Anyone without password can't read this message ${this.result}`


  }
  dechip(string,pass){
    if (this.pass === pass){
      return this.string
    } else {
      return `Ini tulisan rahasia`
    }  
  }

  } // end of class

let startChiper = new chiper()
const encrypt = startChiper.chip("adyasa","jp");
console.log(encrypt);
console.log(startChiper.dechip(encrypt,"j"));


let secondChiper = new chiper()
const encrypt1 = secondChiper.chip("Rizky adyasa", "jk");
console.log(encrypt1);
console.log(secondChiper.dechip(encrypt1,"jk"));
