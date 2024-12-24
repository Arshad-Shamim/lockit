import axios from 'axios';

async function authenticate(data){
    return axios.get(`https://lockit-api.vercel.app/user/signin/authenticate?username=${data.username}&pws=${data.pws}`,{
    }).
    then((res)=>{
        res=res.data;
        console.log("get /user/signin/authenticate:",res);
        if(res.token){
            sessionStorage.setItem("token",res.token);
            sessionStorage.setItem("username",data.username);
        }

        return res;
    }).
    catch((err)=>{
        console.log("err api/sigin/authentication ",err);
        return {"status":0,"msg":"Some thing went wrong!"};
    })
}

export {authenticate}