import {useState} from 'react'

import { authorization } from '../api/features.mjs'
import Error from './Error.jsx'
import store_manage from '../assets/store_manage.png';
import random_pws from '../assets/random_pws.jpg'
import sorting from '../assets/sorting_icon.jpg'
import authontication from '../assets/authontication.jpg'
import personalization from '../assets/personalization.jpg'

export default function Features() {
    let [authorize,setAuthorize] = useState(1);
    let [readmore,setReadmore] = useState(0);     //display content when readmore is 1 and display_id is matched with card_id;
    let[display_id,setDisplay_id]=useState(-1);     // and display store id of clicked box;

    authorization().
    then((res)=>{
        setAuthorize(res);
    })

    function desktop_template(heading,img,content){
        return(
            <div className='ms-4' style={{marginTop:"8vh"}}>
                <h3 className="roboto-bold" style={{color:'#266e2c'}}>{heading}</h3>
                <div className='row my-2'>
                    <img src={img} alt="" className='img-fluid col-lg-2 border p-3 rounded border-4' />
                    <div className="col-lg-9 ms-4">
                        <div className='d-flex align-items-center'>
                            <h5 className=''>
                                {content}
                            </h5>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    function mobile_template(card_id,heading,img,content){

        if(!readmore || display_id!=card_id){   
            return(
                <div className='roboto-regular my-3 bg-white'>
                    <div className="border border-3 rounded">
                        <div className='my-2 container text-center'>
                            <img src={img} alt="" className='w-50'/>
                        </div>
                        <div className='text-center text-white' style={{backgroundColor:'#26bf30'}}>
                            <div>
                                {heading}
                            </div>
                            <div className="text-end">
                                <span className="btn-link btn" onClick={()=>{setReadmore(1);setDisplay_id(card_id)}}>Read more</span>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else{
            return(
                <div className='container border border-3 rounded my-3'>
                    <div className='overflow-auto my-2' style={{height:"30vh"}}>
                        
                        <div classname="">
                            <p>
                                {content}
                            </p>
                        </div>
                    </div>
                    <div className="text-end">
                        <span className="btn btn-link p-0" onClick={()=>setReadmore(0)}>short</span>
                    </div> 
                </div>
            )
        }
    }

    if(!authorize){
        return(<Error msg={"Please log in or sign up to continue...."}/>)
    }
    else{
        return(
            <>
                <div id="features_page" className='mx-4'>
                    
                    <div className='my-4'>
                        <h1 className='text-center permanent-marker-regular fw-bold text-danger'>Unlock the Benefits of LockIt</h1>
                    </div>

                    {/* for desktop screen */}
                    <div className="d-none d-lg-block">
                        {desktop_template("Securely Store and Manage Your Credentials",store_manage,`Our platform is designed to help you manage your login credentials with ease and security. You can store important details such as your user identifier, password, and the associated URL in an organized and secure manner. The stored data is accessible only to you, ensuring complete privacy.Additionally, our intuitive interface gives you the flexibility to manage your saved credentials effortlessly. Need to update your stored details or remove an entry? Simply use our delete feature to permanently remove the selected information from your account.Whether you want to keep track of multiple accounts or manage them conveniently in one place, our system ensures your data is safe, organized, and entirely under your control. Say goodbye to the hassle of forgotten passwords or scattered login details, and enjoy a seamless, secure experience.`)}
                        {desktop_template("One-Click Random Password Generator",random_pws,"Need a secure password in an instant? Our random password generator has you covered. With a single click, you can create a robust password that’s virtually impossible to crack.This feature is perfect for users who want quick access to strong passwords without the hassle of thinking one up themselves. Each password is crafted to be secure and versatile, suitable for any platform or service.Whether you're signing up for a new account or updating an old password, our generator ensures you have a strong foundation for online safety with just one click!")}
                        {desktop_template("Effortless Password Sorting",sorting,"Our password sorting feature is designed to simplify how you manage and access your stored credentials. With options to sort passwords by URL, user identity, or the most recently added entries, finding the right login becomes quick and effortless. No more endless scrolling or searching! Whether you need a specific website's password or want to check the latest saved credentials, this functionality ensures convenience and efficiency. Tailored for an intuitive user experience, it empowers you to stay organized and secure while managing your digital identity with ease. Say goodbye to clutter and enjoy streamlined password management at your fingertips!")}
                        {desktop_template("Easy and Secure Account Access",authontication,"Our platform provides a seamless and secure authorization system, enabling users to sign up for a new account or sign in to an existing one with ease. New users can create accounts quickly, while returning users can log in effortlessly to access their saved passwords and other features. The system prioritizes security and simplicity, ensuring your credentials remain protected at all times. With an intuitive design, the process is streamlined to save you time and effort, making it easy to get started or continue managing your data. Experience smooth authorization and take control of your account with confidence!")}
                        {desktop_template("Personalized and Secure Experience",personalization,"Our platform ensures complete personalization by restricting access so each user can only view and manage their own data. This guarantees privacy and security for your sensitive information. Additionally, the user’s username is conveniently displayed on the navigation bar, providing a customized touch and making account identification seamless. Experience a secure, user-focused environment tailored just for you!")}
                    </div>

                    {/* for mobile screen */}
                    <div className='d-lg-none'>
                        {mobile_template(1,"Securely Store and Manage Your Credentials",store_manage,"Our platform is designed to help you manage your login credentials with ease and security. You can store important details such as your user identifier, password, and the associated URL in an organized and secure manner. The stored data is accessible only to you, ensuring complete privacy.Additionally, our intuitive interface gives you the flexibility to manage your saved credentials effortlessly. Need to update your stored details or remove an entry? Simply use our delete feature to permanently remove the selected information from your account.Whether you want to keep track of multiple accounts or manage them conveniently in one place, our system ensures your data is safe, organized, and entirely under your control. Say goodbye to the hassle of forgotten passwords or scattered login details, and enjoy a seamless, secure experience.")}
                        {mobile_template(2,"One-Click Random Password Generator",random_pws,"Need a secure password in an instant? Our random password generator has you covered. With a single click, you can create a robust password that’s virtually impossible to crack.This feature is perfect for users who want quick access to strong passwords without the hassle of thinking one up themselves. Each password is crafted to be secure and versatile, suitable for any platform or service.Whether you're signing up for a new account or updating an old password, our generator ensures you have a strong foundation for online safety with just one click!")}
                        {mobile_template(3,"Effortless Password Sorting",sorting,"Our password sorting feature is designed to simplify how you manage and access your stored credentials. With options to sort passwords by URL, user identity, or the most recently added entries, finding the right login becomes quick and effortless. No more endless scrolling or searching! Whether you need a specific website's password or want to check the latest saved credentials, this functionality ensures convenience and efficiency. Tailored for an intuitive user experience, it empowers you to stay organized and secure while managing your digital identity with ease. Say goodbye to clutter and enjoy streamlined password management at your fingertips!")}
                        {mobile_template(4,"Easy and Secure Account Access",authontication,"Our platform provides a seamless and secure authorization system, enabling users to sign up for a new account or sign in to an existing one with ease. New users can create accounts quickly, while returning users can log in effortlessly to access their saved passwords and other features. The system prioritizes security and simplicity, ensuring your credentials remain protected at all times. With an intuitive design, the process is streamlined to save you time and effort, making it easy to get started or continue managing your data. Experience smooth authorization and take control of your account with confidence!")}
                        {mobile_template(5,"Personalized and Secure Experience",personalization,"Our platform ensures complete personalization by restricting access so each user can only view and manage their own data. This guarantees privacy and security for your sensitive information. Additionally, the user’s username is conveniently displayed on the navigation bar, providing a customized touch and making account identification seamless. Experience a secure, user-focused environment tailored just for you!")}   
                    </div>
                </div>
            </>
        )
    }
}


//authorization():-
//  check you are authorized or not
//  if yes then display page else display error page;

//desktop_template():-
//  responsiable for desktop screen (col-lg) 

//mobile_template():-
//  responsible for mobile screen;
//  for handle readmore button:-
//      when we click on read more button so we set clicked card id to display_id state and display content only those card which id match with stored display_id 