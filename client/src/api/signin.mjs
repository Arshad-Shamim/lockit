import axios from 'axios';

async function authenticate(data){
    return axios.get("http://localhost:2000/user/signin/authenticate",{
        headers:{
            "username":data.username,
            "pws":data.pws
        }
    }).
    then((res)=>{
        return res
    }).
    catch((err)=>{
        return err;
    })
}

export {authenticate}