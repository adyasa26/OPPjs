//@ts-nocheck
const fs = require('fs')

//-------------- setting mongoose -----------//

let mongoose = require('mongoose');
var Schema = mongoose.Schema;
let userSchema = new Schema({
    key: String,
    value: String,
});

//-------------- setting mysql -----------//
let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adyasa26',
    database: 'yasa'
});



//======================== main class / config ========================

class Config {
    constructor(kelas) {
        this.kelas = kelas
    }
    create(key, value) {
        this.key = key
        this.value = value
        return this.kelas.create(key, value)
    }

    find(key, value) {
        this.key = key
        this.value = value
        return this.kelas.find(key, value)
    }

    update(key, newkey, newvalue) {
        this.key = key
        this.newkey = newkey
        this.newvalue = newvalue
        return this.kelas.update(key, newkey, newvalue)
    }

    delete(key, value) {
        this.key = key
        this.value = value
        return this.kelas.delete(key, value)
    }

    get(key){
        this.key = key
        return this.kelas.get(key)
    }

    put(key, value){
        this.key = key
        this.value = value
        return this.kelas.put(key, value)
    }

    remove(key){
        this.key = key
        return this.kelas.remove(key)
    }
} // end class

//======================== config mongo class ========================

class ConfigMongo {
    constructor(storages) {
        this.storages = storages
    }

    create(key, value) {
        this.key = key
        this.value = value

        mongoose.connect(this.storages);
        let User = mongoose.model('User', userSchema);
        let adyasa = new User({ key: this.key, value: this.value });
        adyasa.save().then(() => {
            console.log('saved')
            process.exit()
        });
    }

    find(key, cb) {
        this.key = key
        mongoose.connect(this.storages);
        let User = mongoose.model('User', userSchema);
        User.find({ "key": this.key }, cb);
        process.exit()
    }

    update(key, newkey, newvalue) {
        this.key = key
        this.newkey = newkey
        this.newvalue = newvalue

        mongoose.connect(this.storages);
        let User = mongoose.model('User', userSchema);
        User.findOneAndUpdate({ key: this.key }, { $set: { key: this.newkey, value: this.newvalue } }).then((users) => {
            console.log('berhasil di update')
            process.exit()
        });
    }

    delete(key) {
        this.key = key

        mongoose.connect(this.storages);
        let User = mongoose.model('User', userSchema);
        User.findOneAndRemove({ key: this.key }).then((users) => {
            console.log("data has been deleted")
            process.exit()

        });
    }
} // end class

//======================== calling config mongo class ========================

// const config = new Config(new ConfigMongo('mongodb://localhost/drops'))
// // config.create('satu','dua')
// config.find('dyas', (err, res) => console.log("====", err, res))

// const config = new Config(new ConfigMongo('mongodb://localhost/drops'))
// config.find("yasa")

// const config = new Config(new ConfigMongo('mongodb://localhost/drops'))
// config.update("adyasa","yasa","ody")

// const config = new Config(new ConfigMongo('mongodb://localhost/drops'))
// config.delete("coba")


//======================== class config local file ========================

class configmysql {
    constructor(storagemysql) {
        this.storagemysql = storagemysql
    }

    create(key, value) {
        this.key = key
        this.value = value

        this.storagemysql.connect();
        let values = { key: this.key, value: this.value };
        let sql = 'INSERT INTO users SET ?'
        connection.query(sql, values, (err, res, field) => { console.log('data berhasil disimpan') });
        connection.end();
    }

    find(key) {
        this.key = key

        this.storagemysql.connect();
        let values = this.key;
        let sql = `SELECT \`key\`, value FROM users WHERE \`key\` = ?`;
        connection.query(sql, values, (err, res, field) => { console.log(res) });
        //console.log(sql);

        connection.end();
    }

    update(key, newkey, newvalue) {
        this.key = key
        this.newkey = newkey
        this.newvalue = newvalue

        this.storagemysql.connect();
        let values = [ this.newvalue, this.newkey, this.key ]
        let sql = `UPDATE users SET \`key\` = ?, value = ? WHERE \`key\` = ?`;
        connection.query(sql, values, (err, res, field) => { console.log('data telah ter-update') });
        //console.log(sql);

        connection.end();
    }

    delete(key) {
        this.key = key

        this.storagemysql.connect();
        let values = this.key
        let sql = `DELETE FROM users WHERE \`key\` = ?`;
        connection.query(sql, values, (err, res, field) => { console.log('data sudah ter-delete') });
        //console.log(sql);

        connection.end();
    }
}

//======================== calling config mmysql class ========================

// const config = new Config(new configmysql(connection))
// config.create("dii","daa");

// const config = new Config(new configmysql(connection));
// config.find('diaz');

const config = new Config(new configmysql(connection))
config.update("nocole","germany","tania")

// const config = new Config(new configmysql(connection))
// config.delete("ntaps")

//======================== calling config mysql class ========================

class configlclfl {
    constructor(storagelclfl){
        this.storagelclfl = []
    }

    put(key, value){
        this.storagelclfl.push({key, value})
        fs.writeFileSync('./config.json', JSON.stringify(this.storagelclfl))
    }

    get(key){
        this.key = key
        this.storagelclfl = fs.readFileSync('./config.json')
        const contents = JSON.parse(this.storagelclfl)
        return contents.find(item => item.key === key)
    }

    // remove(key){ // belum berhasil
    //     this.key = key
    //     this.storagelclfl = fs.readFileSync('./config.json')
    //     const contents = JSON.parse(this.storagelclfl)
    //     const hapus = contents.find(item => item.key === key)
    //     //return hapus.remove(item)=>{
    //         console.log('data berhasil dihapus')
    //     }
    

} // end class configlclfl

// const config = new Config(new configlclfl())
// config.put('name', 'adysa')
// config.put('age', 24)
// config.put('job', 'software engineer')

// console.log(config.get('site'))

//console.log(config.remove('site'))