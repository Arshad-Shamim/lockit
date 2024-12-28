import axios from 'axios';

async function authorization(){
    const token = sessionStorage.getItem("token");

    console.log("authorization",token);
    if(!token)
        return false;
    else{
        return axios.get("https://lockit-api.vercel.app/authorization",{
            headers:{
                Authorization:`Bearer ${token}`
            }
        }).
        then((res)=>{
            res=res.data;
            console.log(res);
            return res.authorize;
        }).
        catch((err)=>{
            console.log(err);
            return false;
        })
    }
}

export {authorization};