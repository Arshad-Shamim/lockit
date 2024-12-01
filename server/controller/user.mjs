import { checkStatus,storeUser,check,storeData as store,fetchUserdata} from "../model/user.mjs";
import { deleteToken } from "../model/email.mjs";

import jwt from 'jsonwebtoken' ;       //for generating token
import crypto from 'crypto';               //for generate pws;

async function signup(req,res){
    console.log("controller/user.mjs/signup");
    const json={};

    try{
        const form = req.body.form;
        let result = await checkStatus(form)

        if(!result){
            json.msg="email not verified!";
            json.status=0;
        }
        else{
            let result = await storeUser(form);
            if(result=="username already exist"){
                json.status=0;
                json.msg="username already exist!";
            }
            else if(result=="email already exist"){
                await deleteToken(form.email);
                console.log("token deleted :",form.email);
                json.status=0;
                json.msg="email already exist!";
            }
            else{
                await deleteToken(form.email);
                console.log("token deleted",form.email);
                const token = jwt.sign({"username":form.username},"hello user");
                console.log("token generated :",token);
                json.msg="signup successfully!";
                json.status=1;
                json.token=token;
            }

        }

    }
    catch(err){
        console.log("controller/user/signup :",err);
        json.msg="Server error!";
        json.status=0;
    }

    res.json(json);
}


async function signin(req,res){
    console.log("users/signin.mjs");
    const json = {};
    try{
        const data = {
            "username":req.headers["username"],
            "pws":req.headers["pws"]
        };
        
        const result = await check(data);

        if(result){
            console.log("signin succesfully");
            json.msg="signin succesfully";
            delete data.pws;
            const token = jwt.sign(data,"hello user");
            console.log("token generated!");
            json.status=1;
            json.token=token;
        }
        else{
            console.log("sginin failed");
            json.status=0;
            json.msg="username or password incorrect";
        }
    }
    catch(err){
        console.log("err (controller/user.mjs/signin):",err);
        json["msg"]="Server Error";
        json.status=0;
    }

    console.log("users/sigin return",json);
    res.json(json);
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

async function storeData(req,res){
    console.log("/controller/users.mjs/storeData")
    const json={};
    json.authorize=true;
    try{
        const data=req.body.data;
        const result = await store(data);
        json.msg="data stored Successfully";
        json.status=1;
        res.json(json);
    }
    catch(err){
        console.log("err :server/contrller/user.mjs :",err);
        json.msg="Server Error";
        json.status=0;
        res.json(json);
    }
}

async function getData(req,res){
    console.log("constroller/user/getData ");
    const json={"authorize":1};
    try{
        const username = req.query.username;
        const result = await fetchUserdata(username);
        json.status=1;
        result.rows=result.rows.map((obj)=>{
            obj.pws=Buffer.from(obj.pws,'base64').toString('utf8');
            return obj;
        })
        json.msg="data fetch successfully!";
        json.data=result.rows;
    }
    catch(err){
        console.log("err :controller/user/getData ",err);
        json.status=0;
        json.msg="Server Error";
    }

    console.log("response :pass",);
    res.json(json);
}

export {signup,signin,validateToken,generatePws,storeData,getData};


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

//store data:-
//  get data from client and store them;
//  here we encode data by Buffer.from(data).toString('base64');
//  and prepare json;