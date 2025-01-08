import React from 'react'
import { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';

import { authorization,changePws as updatePws} from '../api/Changepws.mjs'
import Error from './Error';


export default function changePws() {
    let [authorize,setAuthorize] = useState(1);
    let [showpws1,setShowpws1] = useState(1);
    let [showpws2,setShowpws2] = useState(1);
    let [showpws3,setShowpws3] = useState(1);
    let [passwordData,setPasswordData] = useState({
        "oldPws":"",
        "newPws":"",
        "newConfPws":""
    });

    
  function start_loading(border,content){
    document.getElementById(border).classList.add('spinner-border');
    document.getElementById(content).classList.add('visually-hidden');
  }

  function finish_loading(border,content){
    document.getElementById(border).classList.remove('spinner-border');
    document.getElementById(content).classList.remove('visually-hidden');
  }

    function notifyFailer(data){
        toast(data,{
            style:{
                backgroundColor:"red",
                color:"white",
            },
        });
    }

    function notifySuccess(data){
        toast(data,{
            style:{
                backgroundColor:'#4CAF50',
                color:"#FFFFFF",
            },
        });
    }

    authorization().
    then((res)=>{
        setAuthorize(res);
    }).
    catch((err)=>{
        console.log("changePws/authorization err:",err);
        notifyFailer("Something went wrong!");
    })

    async function handleSubmit(border,content){
        if(passwordData.newPws!=passwordData.newConfPws){
            notifyFailer("New passworw and Confirm password must be same")
        }
        else{
            start_loading(border,content);
            updatePws(passwordData).
            then((res)=>{
                if(res){
                    notifySuccess(res.msg);
                }
                else
                    notifyFailer(res.msg);
            }).
            catch((err)=>{
                console.log("chnagePws/hanldeSubmit err :",err);
                notifyFailer("Some thing wrong!");
            }).
            finally(()=>{
                finish_loading(border,content);
                setPasswordData({"oldPws":"","newConfPws":"","newPws":""});
            })
        }
    }


    if(!authorize){
        return(<Error msg={"Login or Siginup for continue..."}/>)
    }
    else{
        return(
            <>
                <ToastContainer/>
                <div className='border d-flex roboto-regular' style={{height:"100vh"}}>
                    <div className='container border my-auto col-lg-5 col-11 rounded bg-light'>
                        <div className='container my-4'>
                            <div className='col-12'>
                                <h3 className='text-danger text-center my-4 permanent-marker-regular fw-bold'>Change Password</h3>
                                <div className='col-12 row mx-lg-4'>
                                    <label className='col-12 p-0 my-1'>Old Password<span className='text-danger'>*</span></label>
                                    
                                    <div className='col-lg-11 col-12 ps-0'>
                                        <input type={(showpws1)?'password':"text"} className='col-lg-8 col-9 rounded' value={`${passwordData.oldPws}`} onChange={(e)=>setPasswordData((obj)=>({...obj,"oldPws":e.target.value}))} required/>
                                        <span className='btn border m-0 p-0 col-2 ms-2 mb-1 py-1' onClick={()=>setShowpws1(!showpws1)}>
                                            {
                                                (showpws1)?
                                                (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                    </svg>
                                                ):(
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                                    </svg>
                                                )
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className='col-12 row mx-lg-4'>
                                    <label className='col-12 p-0 my-1'>New Password<span className='text-danger'>*</span></label>
                                    
                                    <div className='col-lg-11 col-12 ps-0'>
                                        <input type={(showpws2)?'password':"text"} className='col-lg-8 col-9 rounded' value={`${passwordData.newPws}`} onChange={(e)=>setPasswordData((obj)=>({...obj,"newPws":e.target.value}))} required/>
                                        <span className='btn border m-0 p-0 col-2 ms-2 mb-1 py-1' onClick={()=>setShowpws2(!showpws2)}>
                                            {
                                                (showpws2)?
                                                (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                    </svg>
                                                ):(
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                                    </svg>
                                                )
                                            }
                                        </span>
                                    </div>
                                </div>

                                <div className='col-12 row mx-lg-4'>
                                    <label className='col-12 p-0 my-1'>Confirm New Password<span className='text-danger'>*</span></label>
                                    
                                    <div className='col-lg-11 col-12 ps-0'>
                                        <input type={(showpws3)?'password':"text"} className='col-lg-8 col-9 rounded' value={`${passwordData.newConfPws}`} onChange={(e)=>setPasswordData((obj)=>({...obj,"newConfPws":e.target.value}))} required/>
                                        <span className='btn border m-0 p-0 col-2 ms-2 mb-1 py-1' onClick={()=>setShowpws3(!showpws3)}>
                                            {
                                                (showpws3)?
                                                (
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                                    </svg>
                                                ):(
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                        <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                        <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                                    </svg>
                                                )
                                            }
                                        </span>
                                    </div>
                                    <div className='col-lg-9 col-11 p-0 mt-4'>
                                        <div class="d-grid gap-2">
                                            <button class="btn btn-danger" type="button" onClick={()=>handleSubmit('change_loading','change_content')}>
                                                <span id="change_loading" className=''></span>
                                                <span id="change_content" className=''>Change</span>
                                            </button>
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
