import axios from 'axios';

function varifyEmail(email){                                //send mail and store email and status="false"in table
    axios.post("https://lockit-api.vercel.app/email/verify",{email}).
    then((res)=>{
        console.log("Email sent ");
        console.log(res);
    }).
    catch((err)=>{
        console.log("error in varifyEmail",err);
    })

};

function storeUser(form){                   //store user and handle any error (unique username...);
    return axios.post("http://localhost:2000/user/signup/store",{form}). 
    then((res)=>{
        res=res.data;

        if(res.token){
            sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("username",data.username);
        }

        return res.msg;
    }).
    catch((err)=>{
        return err;
    })

}

export {varifyEmail,storeUser}