import exp from 'constants';
import express, { urlencoded } from 'express'
import { router as handleEmail }  from '../router/email.mjs';
import cors from 'cors';    //for get data from client (only get object);

const app = express();
app.use(express.json());
app.use(cors());

app.use("/email",handleEmail);

app.listen(2000,(err)=>{
    if(err) 
        console.log(err);
    else
        console.log("Srever Started on port number 2000 ");
});

