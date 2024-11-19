import React, { useState } from 'react'
import {Helmet} from 'react-helmet';  //for modify head tag;
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';

import image from '../assets/login.jpg'
import { authenticate } from '../api/signin.mjs';

export default function Signin() {
    let [passwordf,setPasswordf] = useState(true);
    let [password,setPassword] = useState("");
    let [username,setUsername]= useState("");
    let navigate = useNavigate();

    async function handleSubmit(e){
        const data = { 
            "username":e.target.username.value,
            "pws":e.target.pws.value
        }

        authenticate(data).
        then((res)=>{
            if(res.data=="success")
                notifySuccess("Sign in successfull");
            else if(res.data=="failer")
                notifyFailer("Wrong Username or Password");
        }).
        catch((err)=>{
            notifyFailer("Server error !");
        })

        e.preventDefault();
    }

    function notifySuccess(data){
        toast(data,{
            style:{
                backgroundColor:'#4CAF50',
                color:"#FFFFFF",
            },
        });
    }

    function notifyFailer(data){
        toast(data,{
            style:{
                backgroundColor:"red",
                color:"white",
            },
        });
    }

  return (
    <>
    <ToastContainer/>
    <Helmet>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
        <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
    </Helmet>
    <div className='conatiner-fluid roboto-regular' style={{height:"100%",width:"100%"}}>
        <div className='row' style={{height:"100vh"}}>
            <div className='d-none d-lg-block col-lg-6'>
                <img src={image} alt="loding..." style={{minHeight:"100vh"}}/>
            </div>

            <div className='col-lg-6 col-12  m-lg-auto mx-auto' id="sign_in">
                <div className='mx-auto mt-4 container col-11 col-lg-12'>
                    <div className='mt-4 col-lg-8'>
                        <h1 className='roboto-bold' style={{fontWeight:"800"}}>Welcome Back</h1>
                        <p>sign in to continue your progess</p>
                    </div>

                    <div className='mt-4'>
                        <form className='col-lg-8 mt-4' onSubmit={handleSubmit} method='POST'>
                            <div class="mb-3">
                                <label for="exampleInputEmail1" class="form-label">Username<span className='text-danger'>*</span></label>
                                <input type="text" name="username" onChange={(e)=>setUsername(e.target.value)} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
                            </div>
                            <div class="mb-3 container">
                                <label for="exampleInputPassword1" class="form-label d-block">Password<span className='text-danger'>*</span></label>
                                <div className='row'>
                                    <div className='col-10 p-0 m-0'>
                                        <input type={passwordf?"password":"text"} name="pws" onChange={(e)=>{setPassword(e.target.value)}} className="form-control" id="exampleInputPassword1" required/>
                                    </div>
                                    <div className='col-2 p-0 m-0'> 
                                    <span className='ms-2 btn border' onClick={()=>{setPasswordf(!passwordf)}}>
                                        {(passwordf)?
                                            <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                                                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                                                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                                            </svg>
                                            </>:
                                            <>
                                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                                                <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                                                <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                                            </svg>
                                            </>
                                        }
                                    </span>
                                    </div>
                                </div>
                            </div>
                            <div class="d-grid gap-2">
                                <button class="btn btn-primary" type="submit">Sign in</button>
                            </div>
                        </form>

                        <div className="text-center col-lg-8 my-4">
                            <p>New User? <a href="/signup" className='text-decoration-none'>Sign up</a></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}


//submit:-
//  here client sent username or password to api;
//  if crediancial is correct then redirect to home page 
//  else show sign in failer message