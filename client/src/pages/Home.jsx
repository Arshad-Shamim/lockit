import React from 'react'
import {useNavigate} from 'react-router-dom';
import { useState } from 'react';

import {authorization} from '../api/home.mjs';   //for authorize user;
import Error from "./Error.jsx";


export default function Home() {

  let [authorize,setAuthorize]=useState();    

  async function callAuthorization(){
    let temp = await authorization();
    setAuthorize(temp);
  }

  callAuthorization();   //authorize user;

  if(!authorize){
    return(<Error msg={"Please log in to continue...."}/>)
  }
  else{
    return (
      <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success roboto-regular">
        <div className="container-fluid">
          <svg xmlns="http://www.w3.org/2000/svg" width="60" height="38" fill="currentColor" class="bi bi-person-fill-lock text-white" viewBox="0 0 16 16">
              <path d="M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5v-1a2 2 0 0 1 .01-.2 4.49 4.49 0 0 1 1.534-3.693Q8.844 9.002 8 9c-5 0-6 3-6 4m7 0a1 1 0 0 1 1-1v-1a2 2 0 1 1 4 0v1a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1zm3-3a1 1 0 0 0-1 1v1h2v-1a1 1 0 0 0-1-1"/>
          </svg>
          <a className="navbar-brand fw-bold fs-3 permanent-marker-regular" href="#">
            <span className='text-danger'>"Lock"</span>
            <span className='fs-4 text-dark'>+</span>
            <span className='' style={{color:"#bcf514"}}>"It"</span>
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
                  <button type="button" class="btn btn-danger">
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
      </>
    )
  }
}


//nav bar:-
//  responsive nav bar;

//authorization :-
// first we authorize user for home page if they authorize then render page else render error page;
