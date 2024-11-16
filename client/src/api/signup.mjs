import axios from 'axios';

function varifyEmail(email){                                //send mail and store email and status="false"in table
    axios.post("http://localhost:2000/email/verify",{email}).
    then((res)=>{
        console.log("Email sent ");
    }).
    catch((err)=>{
        console.log("error in varifyEmail",err);
    })

};

function storeUser(form){                   //store user and handle any error (unique username...);
    return axios.post("http://localhost:2000/user/signup/store",{form}). 
    then((res)=>{
        return res;
    }).
    catch((err)=>{
        return err;
    })

}

export {varifyEmail,storeUser}