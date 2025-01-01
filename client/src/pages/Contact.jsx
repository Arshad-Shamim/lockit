import React from 'react'
import { useState } from 'react'

import { authorization } from '../api/home.mjs';
import Error from './Error';

export default function contact() {
    let [authorize,setAuthorize] = useState(1);

    authorization().
    then((res)=>{
        setAuthorize(res);
    }).
    catch((err)=>{
        console.log("err contact :",err);
    })



    if(!authorize)
        return(<Error msg={"Please Login or Signup to continue..."}/>)
    else{
        return (
          <div className='border d-flex' style={{height:"100vh"}}>
            <div className='mx-auto my-auto col-lg-6 col-10 bg-light rounded'>
                <div className='container'>
                    <h3 className='text-center my-4 text-danger fw-bold permanent-marker-regular'>Contact Us</h3>
                    <p className='roboto-regular'>Feel free to reach out to us for any inquiries, questions, or support you may need. Whether you're looking for information about our services, need help resolving an issue, or simply want to share your feedback, we're here to assist you every step of the way. Our dedicated team is committed to providing prompt and helpful responses to ensure your experience with us is as smooth and satisfying as possible. Don’t hesitate to get in touch – we’re just a message or call away and ready to help you with whatever you need.</p>

                    <div className='my-4 ms-2'>
                        <div>Gmail Id :<a href="mailto:arshadshmim786@gmail.com">arshadshmim786@gmail.com</a></div>
                        <div>Linked In : <a href='https://linkedin.com/in/ar83had-shamim'>https://linkedin.com/in/ar83had-shamim</a> </div>
                    </div>
                </div>
            </div>  
          </div>
        )
    }
}


//there we just import authorize funtion from api/home.mjs for authorization
//if authorize then diaply page else show not authorize msg