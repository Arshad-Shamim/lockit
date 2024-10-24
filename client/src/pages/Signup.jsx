import React from 'react'
import SignupImg from '../assets/Signup.jpg';
import {Helmet} from 'react-helmet'

export default function Signup() {
  return (
    <>
        <Helmet>
          <link rel="preconnect" href="https://fonts.googleapis.com"/>
          <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
          <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap" rel="stylesheet"/>
        </Helmet>
      <div className='conatiner-fluid row' style={{height:"100vh"}}>

        <div className='image h-100 col-lg-6 d-none d-lg-block'>
            <img src={SignupImg} alt="loading..." className='img-fluid h-100'/>
        </div>

        <div className='col-lg-6 container-fluid h-100'>
          <div className='container col-10 mx-auto mx-lg-0  h-100' style={{margin:"8vh 0"}} >

            <div className='mb-4'>
              <h1 className='text-center roboto-bold'>Join Our Community!</h1>
            </div>

            <form className='roboto-regular'>
            <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Username</label>
                <input type="email" name="username" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label">Email address</label>
                <input type="email" name="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                <div id="emailHelp" class="form-text">We'll never share your email with anyone else.</div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1"/>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label">Confirm Password</label>
                <input type="password" name="password" class="form-control" id="exampleInputPassword1"/>
              </div>
              <button type="submit" class="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
