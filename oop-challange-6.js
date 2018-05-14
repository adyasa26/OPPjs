let mysql = require('mysql2');
let connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'adyasa26',
    database: 'yasa'
});
connection.connect();

class auths{
    login(name, pass){
        this.name = name
        this.pass = pass
       
        let values = [this.name, this.pass]
        let sql = `UPDATE pengguna SET indc = '1', guest = '0', lasttime = CURRENT_TIMESTAMP() WHERE username = ? AND password = ?`;
        connection.query(sql, values, (err, res, field) => { console.log('login') });
        //console.log(sql);
        
        connection.end();
    }
    validate(name, pass){
        this.name = name
        this.pass = pass
        
        let values = [this.name, this.pass]
        let sql = `SELECT * FROM pengguna WHERE username = ? AND password = ?`;
        connection.query(sql, values, (err, res, field) => { console.log('guest') });
        //console.log(sql);
        
        connection.end();
    }
    logout(){
        let sql = `UPDATE pengguna SET indc = '0' WHERE indc = '1'`;
        connection.query(sql, (err, res, field) => { console.log('logout') });
        connection.end();
    }
    users(){
        let sql = `SELECT username FROM pengguna WHERE indc = '1'`;
        connection.query(sql, (err, res, field) => { console.log(res) });
        connection.end();
    }
    id(){
        let sql = `SELECT id FROM pengguna WHERE indc = '1'`;
        connection.query(sql, (err, res, field) => { console.log(res) });
        connection.end();
    }
    check(){
        let sql = `
        SELECT * FROM pengguna WHERE indc = '1'
        `;
        connection.query(sql, (err, res, field) => { 
            //console.log(res)
            if(res.length === 0){
                console.log('false');
            } else{
                console.log('true');
                
            }
        });
        connection.end();
    }
    guest(){
        let sql = `
        SELECT * FROM pengguna WHERE guest = '1'
        `;
        connection.query(sql, (err, res, field) => { 
            //console.log(res.length)
            if(res.length === 0){
                console.log('false');
            } else{
                console.log('true');
                
            }
        });
        connection.end();
    }
    lastlog(){
        let sql = `
        SELECT username, lasttime as 'terakhir log in'
        FROM pengguna ORDER BY lasttime DESC LIMIT 1
        `;
        connection.query(sql, (err, res, field) => { console.log(res) });
        connection.end();
    }
} // end class

const Auth = new auths()
//Auth.login("ady","26saja26");
//Auth.validate("ady","26saja26");
//Auth.logout();
//Auth.users()
//Auth.id()
//Auth.check()
//Auth.guest()
Auth.lastlog()