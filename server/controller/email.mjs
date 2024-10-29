import nodemailer from 'nodemailer';    //for send email
import { emailFromat } from './emailFromet.mjs';

//this function is responsiable for send email to user;
function sendMail(receiver,subject,body){    
    const transpoter = nodemailer.createTransport({   //connect nodemailer to our gamil account;
        service:"gmail",
        auth:{
            user:"arshadshmim786@gmail.com",
            pass:"csmc zgbc kuby igrj"      //this password for third party application that i generate
        }
    });

    const mailOptions = {                       //configure mail
        from:"arshadshmim786@gmail.com",
        to:receiver,
        subject:subject,
        html:body
    };

    transpoter.sendMail(mailOptions,(err,info)=>{    //send mail 
        if(err)
            console.log(err);
        else
            console.log(info.response);
    });
}

function sendEmail(req,res){
    const email = req.body.email;
    const subject = "Verify Your Email Address for Lock-It";
    const body=emailFromat;
    const recevier = email;
    sendMail(recevier,subject,body);
    res.end();
}


export{sendEmail}