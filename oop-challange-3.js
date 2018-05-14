const fs = require('fs');
tgl = new Date();
class log{
    tgl(){
         this.tanggal = new Date();
         return this.tanggal
    }
    info(){
        this.syntax = `[${this.tgl()}] This is an information about something`
        return this.kirim();
    }
    error(){
        this.syntax = `[${this.tgl()}] We can't divide any numbers by zero`
        return this.kirim();
    }
    notice(){
        this.syntax = `[${this.tgl()}] Someone loves your status`
        return this.kirim();
    }
    warning(){
        this.syntax = `[${this.tgl()}]Insufficient funds`
        return this.kirim();
    }
    debug(){
        this.syntax = `[${this.tgl()}] This is debug message`
        return this.kirim();
    }
    alert(){
        this.syntax = `[${this.tgl()}] Achtung! Achtung!`
        return this.kirim();
    }
    critical(){
        this.syntax = `[${this.tgl()}] Medic!! We've got critical damages`
        return this.kirim();
    }
    emergency(){
        this.syntax = `[${this.tgl()}] System hung. Contact system administrator immediately!`
        return this.kirim();
    }
    kirim(){
       return fs.appendFileSync("app.log",this.syntax +'\n',function(err){ console.log("berhasil ditambahkan"); });
    }
} // end of class

// let newSyntax = new log()
// newSyntax.emergency();

let secondSyntax = new log()
secondSyntax.critical();
