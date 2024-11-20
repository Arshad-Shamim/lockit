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
    const db = await dbConnect();
    let table = "lockit_usersdata";
    console.log("database connected");
    
    form.pws = await bcrypt.hash(form.pws,5);   //there 5 is as a parameter higher strong and lower weak;
    let query = `create table if not exists ${table}(username varchar(100) primary key,email varchar(100) unique,pws varchar(100))`;
    let result = await db.query(query);

    try{
        query= `insert into ${table} values ('${form.username}','${form.email}','${form.pws}')`;
        result = await db.query(query);
        console.log("value inserted !");
    }
    catch(err){
        if(err.code=='23505'){
            if(err.detail=="Key (email)=(arshadshmim786@gmail.com) already exists."){
                console.log("email already exist");
                return "email already exist";
            }
            else if(err.detail=="Key (username)=(ar83had) already exists."){
                console.log("username already exist")
                return "username already exist";
            }
        }
    }
}


async function check(data) {
    const db = dbConnect();
    let table = "lockit_usersdata";
    let query = `select * from ${table} where username='${data.username}'`
    const result = await db.query(query);
    if(result.rowCount==0)
        return 0;
    else{
        const ret = await bcrypt.compare(data.pws,result.rows[0].pws)
        return ret;
    }
}

export {checkStatus,storeUser,check}