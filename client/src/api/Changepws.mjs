import axios from "axios";

async function authorization(){
    const token = sessionStorage.getItem("token");

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
            return res.authorize;
        }).
        catch((err)=>{
            console.log(err);
            return false;
        })
    }
}

async function changePws(data){
    let token = sessionStorage.getItem("token");
    let username = sessionStorage.getItem("username");
    data.username = username;

    return axios.post("https://lockit-api.vercel.app/user/changepws",{data},{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).
    then((res)=>{
        res = res.data;
        console.log("chnagepws/changepws get :",res);
        return res;
    }).
    catch((err)=>{
        console.log("changePws/changepws err :",err);
        return {"status":0,"msg":"something went wrong!"}
    })
}

export{authorization,changePws}