import axios from 'axios';

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

async function randomPws(){
    return axios.get("https://lockit-api.vercel.app/randompws").
    then((res)=>{
        return res.data.pws;
    }).
    catch((err)=>{
        console.log(err);
        return false;
    })
}

function storeData(data){
    return axios.post("https://lockit-api.vercel.app/user/data/store",{data},{
        headers:{
            authorization:`Bearer ${sessionStorage.getItem("token")}`
        }
    }).
    then((res)=>{
        res=res.data;
        return res;
    }).
    catch((err)=>{
        console.log(err);
        return res;
    })
}

export{authorization,randomPws,storeData};


// now i got json data {status,msg} format this two member is fixed!;