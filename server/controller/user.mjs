import { checkStatus,storeUser} from "../model/user.mjs";
import { deleteToken } from "../model/email.mjs";

async function signup(req,res){
    try{
        const form = req.body.form;
        let msg = await checkStatus(form)
        if(!msg){
            res.send("email not verified");
        }
        else{
            let result = await storeUser(form);
            if(result=="username already exist")
                res.send(result);
            
            await deleteToken(form.email);
        }
    }
    catch(err){
        console.log("controller/user/signup :",err);
        res.send("server error");
    }
}

export {signup};


//signup:-
//  got form data from client
//  check email is verified or not (by check status of given email) 
//  if email is verified then store data and delete token from table (now email verification link is expired );