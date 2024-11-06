import dbConnect from "./databaseconfig.mjs";

async function storeToken(email,token){
    const db = dbConnect();
    console.log("database connected in storeToken()");

    const table  = "lockit_emailverify";
    let query = `create table if not exists ${table}(email varchar(30) primary key,token varchar(100),status boolean)`;
    let result = await db.query(query);

    query = `select * from ${table} where email=\"${email}\"`;
    result = await db.query(query);
    if(result[0].length==0){
        query = `insert into ${table} value (\"${email}\",\"${token}\","false")`;
        result = await db.query(query);
        console.log(`${email}and${token} is stored in ${table}`);
    }
    else{
        console.log(`${email} and ${token} is already present in table`);
    }
}

async function verifyEmail(email){
    try{
        const db = dbConnect();
        const table = "lockit_emailverify";
        let query = `select status from ${table} where email=\"${email}\"`;
    
        let result = await db.query(query);
        result=result[0];
        let status = result[0].status;
        if(status==1){
            return "You are already verified ";
        }
        else{
            query = `update ${table} set status=true where email=\"${email}\"`;
            result = await db.query(query);
            console.log(result);
            return "Email verifited Successfully !";
        }
    }
    catch(err){
        if(err.errno==1146){
            console.log("err lockit_emailverify table is not exist:",err);
            return "invalid token !";
        }
    }
}

export{storeToken,verifyEmail};