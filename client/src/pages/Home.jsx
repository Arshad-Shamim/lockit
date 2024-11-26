import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { ToastContainer,toast } from 'react-toastify';    //notification

import {authorization} from '../api/home.mjs';   //for authorize user;
import Error from "./Error.jsx";
import {randomPws as generatePws} from '../api/home.mjs';


export default function Home() {

  let [authorize,setAuthorize]=useState(true);  
  let [pwsshow,setPwsshow]=useState(true);          //both random pws and user input store here;
  let [pws,setPws] =useState("");
  let navigate = useNavigate();

  
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

    console.log(temppws);
    if(temppws)
      setPws(temppws);
    else
      notifyFailer("Server Error!");
  }

  function handleSubmit(e){
    e.target.pws.value=pws;                       //store both input as well as random pws into pws.value;
    console.log(e.target.pws.value);
    e.preventDefault();
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
            <svg xmlns="http://www.w3.org/2000/svg" width="60" height="38" fill="currentColor" class="bi bi-person-fill-lock text-white" viewBox="0 0 16 16">
                <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
            </svg>
            <a className="navbar-brand fw-bold fs-3 permanent-marker-regular" href="#">
              <span className='text-warning'>"Lock"</span>
              <span className='fs-4 text-light'>+</span>
              <span className='text-warning'>"It"</span>
            </a>

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
                <form onSubmit={handleSubmit} method="POST">

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter Username </label>
                        <input type="text" name="username" class="form-control" id="exampleInputEmail1"  style={{backgroundColor:"#a0ebc0"}}/>
                    </div>

                    <div class="mb-3 col-12 row">
                        <label for="exampleInputPassword1" class="form-label">Enter Password</label>
                        <div className="col-lg-8 col-12 ps-2 pe-0">
                            <input type="text" name="pws" value={pws} onChange={(e)=>setPws(e.target.value)} class="form-control" id="exampleInputPassword1" style={{backgroundColor:"#a0ebc0"}}/>
                        </div>

                        <div className="col-lg-4 col-12 mt-1 mt-lg-0  ps-2">
                            <button class="btn btn-warning" type="button" onClick={randomPws}>Generate Password</button>
                        </div>
                    </div>

                    <div class="mb-3">
                        <label for="exampleInputEmail1" class="form-label">Enter U.R.L. </label>
                        <input type="text" name="url" class="form-control" id="exampleInputEmail1"  style={{backgroundColor:"#a0ebc0"}}/>
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
