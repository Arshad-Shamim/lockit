import { emailFromat,sendMail } from './emailHelper.mjs';  //for sending mail
import { storeToken,verifyEmail as updateStatus } from '../model/email.mjs';

import jwt from 'jsonwebtoken';  //for encode or decode email;
import ejs from 'ejs';           //for render .ejs file
import path from 'path';
import express from 'express';

import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

app.set("view engin","ejs");               //configure ejs tempplate engin
app.set("engin",path.resolve("/var/task/server/views"));
console.log(path.join(__dirname, 'views'));


function sendEmail(req,res){
    try{
        const [emailBody,token]=emailFromat(req.body.email);
        const email = req.body.email;
        const subject = "Verify Your Email Address for Lock-It";
        const body=emailBody;
        const recevier = email;
        sendMail(recevier,subject,body);
        storeToken(email,token);
        res.end();
    }
    catch(err){
        console.log("cotroller/email/sendemail :",err);
        res.send("server error");
    }
}

function verifyEmail(req,res){     //this route verify user;
    const token = req.query.token;
    
    jwt.verify(token,"verification_link",async (err,email)=>{
        if(err){
            console.log("Invalid Email :",err);
            res.end();
        }
        else{
            let msg = await updateStatus(email.email);
            if(msg=="You are already verified !" || msg=="Email verifited Successfully !")
                res.render("success.ejs",{"bgcolor":"bg-success","msg":msg});
            else
                res.render("failer.ejs",{"bgcolor":"bg-danger","msg":msg});
            console.log("message :",msg);
        };
    });

}

export{sendEmail,verifyEmail};



//sending mail:-
//  got email from client
//  and got email body and token form emailhelper.mjs file
//  then send mail


//verifyEmail:-
//  decode token;
// update status of decoded email;
//  render success or failer page according to msg;