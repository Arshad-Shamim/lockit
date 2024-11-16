import { checkStatus,storeUser } from "../model/user.mjs";

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
        }
    }
    catch(err){
        console.log("controller/user/signup :",err);
        res.send("server error");
    }
}

export {signup};