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

function getData(token,username){
    return axios.get(`https://lockit-api.vercel.app/user/data?username=${username}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).
    then((res)=>{
        res=res.data;
        console.log(`get /user/data?username=${username}`,res);
        return res;
    }).
    catch((err)=>{
        console.log("err :api/home/getData",err);
        return({status:0,msg:"server error"});
    })
}

async function deleteData(url){
    const token = sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");

    return axios.delete(`https://lockit-api.vercel.app/user/data/delete?username=${username}&url=${url}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).
    then((res)=>{
        res=res.data;
        console.log(`get user/data/delete?username=${username},url=${url}`,res);
        return res;
    }).
    catch((err)=>{
        console.log("err user/data/delete?username=${username},url=${url}",err);
        return {"status":0,"msg":"something went wrong!"};
    })
}

async function sortData(sortBy){
    const token=sessionStorage.getItem("token");
    const username = sessionStorage.getItem("username");


    return axios.get(`https://lockit-api.vercel.app/user/data/sort?username=${username}&sortBy=${sortBy}`,{
        headers:{
            Authorization:`Bearer ${token}`
        }
    }).
    then((res)=>{
        res=res.data;
        console.log(`get /users/data/sort?username=${username}&sortBy=${sortBy}`,res);
        return res;
    }).
    catch((err)=>{
        console.log(`err /users/data/sort?username=${username}&sortBy=${sortBy} :`,err);
        return {"status":0,"mag":"something went wrong!"};
    })  
}

export{authorization,randomPws,storeData,getData,deleteData,sortData};


// now i got json data {status,msg} format this two member is fixed!;