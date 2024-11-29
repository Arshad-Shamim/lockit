import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';    //notification

import {authorization,randomPws as generatePws,storeData} from '../api/home.mjs';   //for authorize user;
import Error from "./Error.jsx";


export default function Home() {

  let [authorize,setAuthorize]=useState(true);  
  let [pwsshow,setPwsshow]=useState(true);          //both random pws and user input store here;
  let [pws,setPws] =useState("");
  let navigate = useNavigate();
  let [username,setUsername]=useState(sessionStorage.getItem("username"));
  
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

  async function callAuthorization(){
    let temp = await authorization();
    setAuthorize(temp);
  }

  callAuthorization();   //authorize user;

  function handleSigout(){
    sessionStorage.clear();
    navigate("/signin");
    return;
  }

  async function randomPws(){             //cal api from random generated pws;
    let temppws = await generatePws();

    if(temppws){
      setPws(temppws);
    }
    else
      notifyFailer("Server Error!");
  }

  async function handleSubmit(e){
    e.target.pws.value=pws;                       //store both input as well as random pws into pws.value;

    const data = {
      "username":sessionStorage.getItem("username"),
      "user_indentifier":e.target.user_indentifier.value,
      "pws":e.target.pws.value,
      "url":e.target.url.value
    }

    storeData(data).
    then((res)=>{
      if(res.status){
        notifySuccess(res.msg);
        e.target.reset();
      }
      else
        notifyFailer(res.msg);
    }).
    catch((err)=>{
      notifyFailer("Some Went Wrong !");
    });

    e.preventDefault();
  }

  async function handleCopy(){

    await navigator.clipboard.writeText(pws);      //copy pws

    const element = document.getElementById("copy");
    element.style.backgroundColor="#15b037";
    notifySuccess("password copied");

    setTimeout(()=>{
      element.style.backgroundColor="#198754";
    },800);
  }

  if(!authorize){
    return(<Error msg={"Please log in to continue...."}/>)
  }
  else{
    return (
      <>
        <ToastContainer/>     

            {/* nav bar */}

        <nav className="navbar navbar-expand-lg navbar-dark bg-success roboto-regular">
          <div className="container-fluid">
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="38" fill="currentColor" class="bi bi-person-fill-lock" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
            </svg>
            <span className="navbar-brand fw-bold fs-3 permanent-marker-regular ">
              <span className='text-light'>{username}</span>
            </span>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <a className="nav-link active" aria-current="page" href="#features">
                    Features
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#about">
                    Developer
                  </a>
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#contact">
                    Contact
                  </a>
                </li>
                <li className='nav-item'>
                    <button type="button" class="btn btn-warning btn-sm mt-1 me-2" onClick={handleSigout}>
                        <span>Sign out </span>   
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-left" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0z"/>
                            <path fill-rule="evenodd" d="M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708z"/>
                        </svg>
                    </button>
                </li>
              </ul>
            </div>
          </div>
      </nav>

            {/* input box */}
        <div className="d-flex align-items-center justify-content-center roboto-regular" style={{height:"90vh"}}>
            <div className="text-white bg-success rounded  col-12 col-lg-6 px-4 px-lg-4 py-4">

                <h3 className='text-center fw-bold mb-4'>
                  Lock It Up
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-database-fill-lock ms-2" viewBox="0 0 16 16">
                    <path d="M8 1c-1.573 0-3.022.289-4.096.777C2.875 2.245 2 2.993 2 4s.875 1.755 1.904 2.223C4.978 6.711 6.427 7 8 7s3.022-.289 4.096-.777C13.125 5.755 14 5.007 14 4s-.875-1.755-1.904-2.223C11.022 1.289 9.573 1 8 1"/>
                    <path d="M3.904 9.223C2.875 8.755 2 8.007 2 7v-.839c.457.432 1.004.751 1.49.972C4.722 7.693 6.318 8 8 8s3.278-.307 4.51-.867c.486-.22 1.033-.54 1.49-.972V7c0 .424-.155.802-.411 1.133a4.5 4.5 0 0 0-1.364-.125 3 3 0 0 0-2.197.731 4.5 4.5 0 0 0-1.254 1.237A12 12 0 0 1 8 10c-1.573 0-3.022-.289-4.096-.777M8 14c-1.682 0-3.278-.307-4.51-.867-.486-.22-1.033-.54-1.49-.972V13c0 1.007.875 1.755 1.904 2.223C4.978 15.711 6.427 16 8 16q.134 0 .266-.003A2 2 0 0 1 8 15zm0-1.5q0 .15.01.3A2 2 0 0 0 8 13c-1.573 0-3.022-.289-4.096-.777C2.875 11.755 2 11.007 2 10v-.839c.457.432 1.004.751 1.49.972C4.722 10.693 6.318 11 8 11q.13 0 .257-.002A4.5 4.5 0 0 0 8 12.5"/>
                    <path d="M9 13a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
                  </svg>
                </h3>

                <form onSubmit={handleSubmit} method="POST">

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter User Identifier</label>
                        <input type="text" name="user_indentifier" class="form-control fw-light" id="exampleInputEmail1"  style={{backgroundColor:"#a0ebc0"}} placeholder='eg: username,phone no,email id' />
                    </div>

                    <div class="mb-3 col-12 row">
                        <label for="exampleInputPassword1" class="form-label">Enter Password</label>

                        <div className="col-lg-8 col-12 ps-2 pe-0 row"> 
                          <div className='col-9 pe-0'>
                            <input type="text" name="pws" value={pws} onChange={(e)=>setPws(e.target.value)} class="form-control fs-6" id="exampleInputPassword1" style={{backgroundColor:"#a0ebc0"}} placeholder='*************'/>
                          </div>
                          <div className='col-2 px-2 text-center pt-1 ms-2 border rounded btn text-white' id="copy" onClick={handleCopy} >
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
                              </svg>
                          </div>
                        </div>

                        <div className="col-lg-4 col-12 mt-1 mt-lg-0  ps-2 ms-auto">
                            <button class="btn btn-warning" type="button" onClick={randomPws}>Generate Password</button>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter U.R.L. </label>
                        <input type="text" name="url" class="form-control fs-7 fw-light" id="exampleInputEmail1"  style={{backgroundColor:"#a0ebc0"}} placeholder='eg: https://xyz.com/signin'/>
                    </div>

                    <div class="d-grid gap-2">
                      <button class="btn btn-warning" type="submit">
                        Save
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-down ms-1" viewBox="0 0 16 16">
                          <path fill-rule="evenodd" d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1z"/>
                          <path fill-rule="evenodd" d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708z"/>
                        </svg>
                      </button>
                    </div>
             </form>
            </div>
        </div>

        <div>

        </div>

            {/* developer */}
        <div className="fixed-bottom text-center roboto-bold text-white" style={{backgroundColor:"#198754"}}>
            Developed By Arshad Shamim
        </div>
      </>
    )
  }
}


//nav bar:-
//  responsive nav bar;

//authorization :-
// first we authorize user for home page if they authorize then render page else render error page;

//signout:-
//  clear/delete session

//pws:-
//  if user click on generate pws button then call api for pws and upate pws state;
//  else user can also enter pws my self;
//  and on submit replace this pws state with e.target.pws.value;


//copy pws:-
//     await navigator.clipboard.writeText(pws);
//      copy pws and change bg-color after 1s (useing setTimeout) change bg-color to previous color;

//get username from session and display it;

//store data(form data):-
//  call api with data and token;
//  and according to status memeber of json display msg;
