import exp from 'constants';
import express, { urlencoded } from 'express'
import { router as handleEmail }  from '../router/email.mjs';

const app = express();
app.use(express.json());

app.use("/email",handleEmail);

app.listen(2000,(err)=>{
    if(err) 
        console.log(err);
    else
        console.log("Srever Started on port number 2000 ");
});

