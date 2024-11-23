import React from 'react'
import {Helmet} from 'react-helmet'                  //for mofifing header;
import { useState } from 'react';
import {toast,ToastContainer} from 'react-toastify';    //use for react message;
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from "react-router-dom";

import { varifyEmail,storeUser } from '../api/signup.mjs';
import SignupImg from '../assets/signup.jpg';

export default function Signup() {

  let [form,setForm] = useState({"username":"","email":"","pws":""});

  let [passwordf,setPasswordf] = useState(false);

  let navigate = useNavigate();

  function handleEmail(e){          // handle varify button of email; there if input="as" then email="a" and temp="as" email update after function end and mount the page;
      form.email = e.target.value;
      setForm(form);
      let temp = e.target.value;
      let count=0;
      for(let ch of temp){     //email must be contain excatily one @;
        if(ch=='@')
          count++;
      }

      if(count==1){
          let element = document.getElementById("varify");
          element.classList.remove("disabled");           //handle verify button class list;
      }
      else
      {
        let element=document.getElementById("varify");
        element.classList.add("disabled")
      }
  }

  function handlevarify(){
    varifyEmail(form.email);
    notifySucees("email sent successfully !");
  }

  function notifySucees(data){   //create a messge template
    toast(data,{
      style:{
        backgroundColor:'#4CAF50',
        color:"#FFFFFF",
      },
    });
  };

  function notifyfailer(data){
    toast(data,{
      style:{
        backgroundColor:"red",
        color:"white"
      }
    })
  }

  async function handleSubmit(e){                     
    let pws = e.target.password.value;
    let cpws = e.target.cpassword.value;

    if(pws!=cpws){
      notifyfailer("password and confirm must be same")
    }
    else{
        const temp={
          "username":e.target.username.value,
          "email":e.target.email.value,
          "pws":e.target.password.value
        }        
        setForm(temp)
        
        storeUser(temp).                       //for get return value from axios async function;
        then((res)=>{
          if(res=="username already exist")
            notifyfailer("username already exist");
          else if(res=="email not verified")
            notifyfailer("email not verified");
          else if(res=="server error")
            notifyfailer("Server Error ");
          else if(res=="email already exist")
            notifyfailer("email already exist");
          else
            navigate("/home");
        }).
        catch((err)=>{
          console.log(err);
          notifyfailer("server error");
        })

    }
    e.preventDefault();
  }

  return (
    <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
        </Helmet>
      <ToastContainer/>     
      <div className='conatiner-fluid row' style={{height:"100%",width:"100%"}}>

        <div className='image h-100 col-lg-6 d-none d-lg-block my-auto'>
              <img src={SignupImg} alt="loading..." className='img-fluid h-100 my-4'/>
        </div>

        <div className='col-lg-6 container-fluid h-100'>
          <div className='container col-10 mx-auto mx-lg-0  h-100' style={{margin:"8vh 0"}} >
            <div className='mb-4'>
              <h1 className='text-center roboto-bold'>Create Your Account</h1>
            </div>

            <form className='roboto-regular' method='POST' onSubmit={handleSubmit}>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Username<span className='text-danger'>*</span></label>
                  <input type="text" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required/>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address<span className='text-danger'>*</span></label>
                <div className='row'>
                  <div className='col-10 p-0 m-0'>
                    <input type="email" name="email" className="form-control" onChange={(e)=>handleEmail(e)} id="exampleInputEmail1" aria-describedby="emailHelp" required/>
                  </div>
                  <div className='col-2 p-0 m-0'>
                    <button type="button" id="varify" onClick={handlevarify} className="btn btn-primary ms-2 disabled m-0" style={{backgroundColor:"#683ec5"}}>Verify</button>
                  </div>
                </div>
                <div class="form-text"><input type="checkbox" name="checkverify" value="true" required/> hereby, I declare that i had verify my email</div>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password<span className='text-danger'>*</span></label>
                <div className='col-12  row'>
                  <div className='col-11'>
                    <input type={!passwordf?"password":"text"} name="password" class="form-control" id="exampleInputPassword1" required/>
                  </div>
                  <div className='border col-1 rounded p-0 m-0'>
                    <div className='border h-100 text-center rounded' onClick={()=>setPasswordf(!passwordf)}>
                      {
                        !passwordf?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>:
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                        </svg>
                      }
                    </div>
                  </div>
                </div>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" name = "cpassword" class="form-label">Confirm Password<span className='text-danger'>*</span></label>
                <div className='col-12  row'>
                  <div className='col-11'>
                    <input type={!passwordf?"password":"text"} name="cpassword" class="form-control" id="exampleInputPassword1" required/>
                  </div>
                  <div className='border col-1 rounded p-0 m-0'>
                    <div className='border h-100 text-center rounded' onClick={()=>setPasswordf(!passwordf)}>
                      {
                        !passwordf?
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="currentColor" class="bi bi-eye-fill" viewBox="0 0 16 16">
                          <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                          <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                        </svg>:
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="100%" fill="currentColor" class="bi bi-eye-slash-fill" viewBox="0 0 16 16">
                          <path d="m10.79 12.912-1.614-1.615a3.5 3.5 0 0 1-4.474-4.474l-2.06-2.06C.938 6.278 0 8 0 8s3 5.5 8 5.5a7 7 0 0 0 2.79-.588M5.21 3.088A7 7 0 0 1 8 2.5c5 0 8 5.5 8 5.5s-.939 1.721-2.641 3.238l-2.062-2.062a3.5 3.5 0 0 0-4.474-4.474z"/>
                          <path d="M5.525 7.646a2.5 2.5 0 0 0 2.829 2.829zm4.95.708-2.829-2.83a2.5 2.5 0 0 1 2.829 2.829zm3.171 6-12-12 .708-.708 12 12z"/>
                        </svg>
                      }
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="submit" style={{backgroundColor:"#683ec5"}}>Submit</button>
              </div>            
            </form>

            <div className='mt-2 text-center'>
              <div>Already have an account ?<a href="/signin" className='text-decoration-none'> Sign in</a></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}




//so store user from data in database;
//if successfull signup redirect to home page else email is not verified or server error;
//for sign in if successfull so redirect else doest have an account
//now i request to my localhost




// email verifed funcanality:-

//   if user enter excataly one @ in  email input feild then verify button is enabled;
//  after checking on verify button mail is send to specified email and api store email and status="false"(i.e. email is not verified)
//  there is a verify link in mail and when user click on that link then api update the status="true" of that email (i.e. email verified) 


//username must me unique;
//and email also must be unique;

//password and confirm password must be same;

//submit:-
//  when all input is field , pws and confirm pws same , email is verified then only submit;
//  after submition delete email and status from table (i.e.) now verify link is expire;
//  then create session and store token and username there;