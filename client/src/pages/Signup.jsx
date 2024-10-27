import React from 'react'
import SignupImg from '../assets/Signup.jpg';
import {Helmet} from 'react-helmet'
import { useState } from 'react';

export default function Signup() {

  let [email,setEmail] = useState("");
  let [passwordf,setPasswordf] = useState(false);
  function handleEmail(e){          // handle varify button of email; there if input="as" then email="a" and temp="as" email update after function and mount the page;
      setEmail(e.target.value);
      let temp = e.target.value;
      let count=0;
      for(let ch of temp){     //email must be contain excatily one @;
        if(ch=='@')
          count++;
      }

      if(count==1){
          let element = document.getElementById("varify");
          element.classList.remove("disabled");
      }
      else
      {
        let element=document.getElementById("varify");
        element.classList.add("disabled")
      }
  }

  return (
    <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
        </Helmet>
      <div className='conatiner-fluid row' style={{height:"100%",width:"100%"}}>

        <div className='image h-100 col-lg-6 d-none d-lg-block my-auto'>
              <img src={SignupImg} alt="loading..." className='img-fluid h-100 my-4'/>
        </div>

        <div className='col-lg-6 container-fluid h-100'>
          <div className='container col-10 mx-auto mx-lg-0  h-100' style={{margin:"8vh 0"}} >
            <div className='mb-4'>
              <h1 className='text-center roboto-bold'>Create Your Account</h1>
            </div>

            <form className='roboto-regular'>
              <div class="mb-3">
                  <label for="exampleInputEmail1" class="form-label">Username</label>
                  <input type="email" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <div className='row'>
                  <div className='col-10 p-0 m-0'>
                    <input type="email" name="email" className="form-control" onChange={(e)=>handleEmail(e)} id="exampleInputEmail1" aria-describedby="emailHelp"/>
                  </div>
                  <div className='col-2 p-0 m-0'>
                    <button type="button" id="varify" className="btn btn-primary ms-2 disabled m-0" style={{backgroundColor:"#683ec5"}}>Varify</button>
                  </div>
                </div>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>

              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <div className='col-12  row'>
                  <div className='col-11'>
                    <input type={!passwordf?"password":"text"} name="password" class="form-control" id="exampleInputPassword1"/>
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
                <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                <div className='col-12  row'>
                  <div className='col-11'>
                    <input type={!passwordf?"password":"text"} name="password" class="form-control" id="exampleInputPassword1"/>
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
                <button class="btn btn-primary" type="button" style={{backgroundColor:"#683ec5"}}>Submit</button>
              </div>            
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
