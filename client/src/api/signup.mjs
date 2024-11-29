import axios from 'axios';

async function varifyEmail(email){                                //send mail and store email and status="false"in table
    return axios.post("http://localhost:2000/email/verify",{email}).
    then((res)=>{
        res=res.data;
        console.log("get /email/verify:",res);
        return res;
    }).
    catch((err)=>{
        console.log("signup/verifyEmail :",err);
        return {"status":0,"msg":"Someting went wrong!"};
    })

};

function storeUser(form){                   //store user and handle any error (unique username...);
    return axios.post("http://localhost:2000/user/signup/store",{form}). 
    then((res)=>{
        res=res.data;

        console.log("get /user/signup/store:",res);
        if(res.token){
            sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("username",form.username);
        }

        return res;
    }).
    catch((err)=>{
        return err;
    })

}

export {varifyEmail,storeUser}