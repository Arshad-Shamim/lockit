import { checkStatus,storeUser,check} from "../model/user.mjs";
import { deleteToken } from "../model/email.mjs";

async function signup(req,res){
    try{
        const form = req.body.form;
        console.log(form);
        let msg = await checkStatus(form)
        console.log(msg);
        if(!msg){
            res.send("email not verified");
        }
        else{
            let result = await storeUser(form);
            if(result=="username already exist")
                res.send(result);
            
            console.log(result);
            await deleteToken(form.email);
        }
    }
    catch(err){
        console.log("controller/user/signup :",err);
        res.send("server error");
    }
}


async function signin(req,res){
    try{
        const data = {
            "username":req.headers["username"],
            "pws":req.headers["pws"]
        };
        
        const result = await check(data);

        if(result){
            console.log("signin succesfully");
            res.send("success");
        }
        else{
            console.log("sginin failed");
            res.send("failer")
        }
    }
    catch(err){
        console.log("err (controller/user.mjs/signin):",err);
        res.end()
    }
}


export {signup,signin};


//signup:-
//  got form data from client
//  check email is verified or not (by check status of given email) 
//  if email is verified then store data and delete token from table (now email verification link is expired );


//signin:-
//  got data from cient
//  match data with database if matched res="success" else res="failer"
//      fetch pws from database then decode it and then match with user pws;