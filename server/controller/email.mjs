import nodemailer from 'nodemailer';
import { emailFromat } from './emailFromet.mjs';

function sendMail(receiver,subject,body){
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"arshadshmim786@gmail.com",
            pass:"csmc zgbc kuby igrj"
        }
    });

    const mailOptions = {
        from:"arshadshmim786@gmail.com",
        to:receiver,
        subject:subject,
        html:body
    };

    transpoter.sendMail(mailOptions,(err,info)=>{
        if(err)
            console.log(err);
        else
            console.log(info.response);
    });
}

function sendEmail(req,res){
    console.log(req.body)
    const email = req.body.email;
    const subject = "Verify Your Email Address for Lock-It";
    const body=emailFromat;
    const recevier = email;
    sendMail(recevier,subject,body);
    res.end();
}


export{sendEmail}