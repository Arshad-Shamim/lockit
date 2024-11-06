import jwt from 'jsonwebtoken';   //for encode and decode token
import nodemailer from 'nodemailer';    //for send email


const emailFromat = (email)=>{
    const token = jwt.sign({"email":email},"verification_link");    //encode token;

return[`      
 <div>
    <h2>Hi,</h2>
    <p>Thank you for registering with Lock-It ! To complete your sign-up, please verify your email address by clicking the link below:</p>
    <a href=http://localhost:2000/email/verified?token=${token} style="text-decoration: none;">varify email</a>
    <p>If you did not create an account, please ignore this email.</p>
    <p>Thank you</p>
    <p>The Lock-It Team</p>
</div>
`,token]}

//this function is responsiable for send email to user;
async function sendMail(receiver,subject,body){    
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
        if(err){
            console.log("error while sending email :",err);
        }
        else
        {
            console.log("email send successfully :",info.response);
        }
    });
}

export {emailFromat,sendMail}
