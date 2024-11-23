import { checkStatus,storeUser,check} from "../model/user.mjs";
import { deleteToken } from "../model/email.mjs";

import jwt from 'jsonwebtoken' ;       //for generating token

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
                json.msg=result;
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

    }
    catch(err){
        console.log("controller/user/signup :",err);
        json.msg="Server error!";
    }
    finally{
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
    console.log({"authorize":true});
    res.json({"authorize":true});
}

export {signup,signin,validateToken};


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