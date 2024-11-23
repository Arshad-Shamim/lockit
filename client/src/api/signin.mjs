import axios from 'axios';

async function authenticate(data){
    return axios.get("https://lockit-api.vercel.app/user/signin/authenticate",{
        headers:{
            "username":data.username,
            "pws":data.pws
        }
    }).
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

export {authenticate}