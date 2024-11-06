import axios from 'axios';

//till now this for send varification email to user;
function varifyEmail(email){
    axios.post("http://localhost:2000/email/verify",{email}).
    then((res)=>{
        console.log("Email sent ");
    }).
    catch((err)=>{
        console.log("error in varifyEmail",err);
    })

};

export {varifyEmail}