import mysql from 'mysql2/promise';

export default function dbConnect(){
    const db = mysql.createPool({
        host:"sql12.freesqldatabase.com",
        user:"sql12742328",
        password:"xbY2lCSzBF",
        database:"sql12742328",
        waitForConnections: true,
    })

    return db;
};
