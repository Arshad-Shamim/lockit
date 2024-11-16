import dbConnect from "./databaseconfig.mjs";
import bcrypt from 'bcrypt';           //for encode or decode the password;

async function checkStatus(form){
    const table = "lockit_emailverify";
    const db = await dbConnect();
    const email = form.email;

    let query = `select status from ${table} where email='${email}'`
    let {rows} = await db.query(query);
    if(rows.length==0)
        return false;
    else{
        const status = rows[0].status;
        return status;
    }
}

async function storeUser(form){
    const db = dbConnect();
    let table = "lockit_usersdata";

    form.pws = await bcrypt.hash(form.pws,5);   //there 5 is as a parameter higher strong and lower weak;
    let query = `create table if not exists ${table}(username varchar(100) primary key,email varchar(100),pws varchar(100))`;
    let result = await db.query(query);

    try{
        query= `insert into ${table} values ('${form.username}','${form.email}','${form.pws}')`;
        result = await db.query(query);
        console.log("value inserted !");
    }
    catch(err){
        if(err.code=='23505'){
            console.log("username already exist")
            return "username already exist";
        }
    }
}

export {checkStatus,storeUser}