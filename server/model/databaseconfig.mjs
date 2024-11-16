// import mysql from 'mysql2/promise';

// export default function dbConnect(){
//     const db = mysql.createPool({
//         host:"sql12.freesqldatabase.com",
//         user:"sql12742328",
//         password:"xbY2lCSzBF",
//         database:"sql12742328",
//         waitForConnections: true,
//     })

//     return db;
// };

import pkg from 'pg'
const {Pool} = pkg;


export default function dbConnect(){
    const pool = new Pool({
        host:"aws-0-ap-south-1.pooler.supabase.com",
        port:"6543",
        user:"postgres.oxcxsvondqzyuucpivsj",
        password:"arShad@78611819814",
        database:"postgres",
        ssl:{rejectUnauthorized:false,},
    });

    return pool;
}
