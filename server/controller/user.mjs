import { checkStatus,storeUser,check} from "../model/user.mjs";
import { deleteToken } from "../model/email.mjs";

import jwt from 'jsonwebtoken' ;       //for generating token
import crypto from 'crypto';               //for generate pws;

async function signup(req,res){
    const json={};
    try{
        const form = req.body.form;
        console.log(form);
        let msg = await checkStatus(form)
        if(!msg){
            json.msg="email not verified!";
        }
        else{
            let result = await storeUser(form);
            if(result=="username already exist")
                json.msg="username already exist!";
            else if(result=="email already exist"){
                await deleteToken(form.email);
                json.msg="email already exist!";
            }
            else{
                await deleteToken(form.email);
                const token = jwt.sign({"username":form.username},"hello user");
                json.msg="signup successfully!";
                console.log("token generated!");
                json.token=token;
            }
        }

        res.json(json);
    }
    catch(err){
        console.log("controller/user/signup :",err);
        json.msg="Server error!";
        res.json(json);
    }
}


async function signin(req,res){
    const json = {};
    try{
        const data = {
            "username":req.headers["username"],
            "pws":req.headers["pws"]
        };
        
        const result = await check(data);

        if(result){
            console.log("signin succesfully");
            json.msg="success";
            delete data.pws;
            const token = jwt.sign(data,"hello user");
            console.log("token generated!");
            json.token=token;
        }
        else{
            console.log("sginin failed");
            json.msg="failer";
        }
        console.log(json);
        res.json(json);
    }
    catch(err){
        console.log("err (controller/user.mjs/signin):",err);
        json["msg"]="Server Error";
        res.end()
    }
}


async function validateToken(req,res){
    res.json({"authorize":true});
}

async function generatePws(req,res){
    try{
        let length =12;
        let chars ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}<>?';
    
        let pws = "";
    
        for(let c1=0;c1<length;c1++){
            let index=crypto.randomInt(0,chars.length);
            pws+=chars[index];
        }
    
        console.log("password generated :",pws);
        let json={"pws":pws};
        res.json(json);
    }
    catch(err){
        console.log("Server error server/constroller/user.mjs",err);
        res.send(err);
    }
}

export {signup,signin,validateToken,generatePws};


//signup:-
//  got form data from client
//  check email is verified or not (by check status of given email) 
//  if email is verified then store data and delete token from table (now email verification link is expired );


//signin:-
//  got data from cient
//  match data with database if matched res="success" else res="failer"
//      fetch pws from database then decode it and then match with user pws;

//AuthenticateToken:-
//  if token is valid then send a positive response;
//  else send false;


//generatepws:-
//  genearte a random pws of 12 length;