import express from 'express'
import nodemailer from 'nodemailer'

const app = express();
app.use(express.json());

app.post("/sendemail",(req,res)=>{
    const email=req.body.email;
    const link = "localhost:2000/sendemail";
    const transpoter = nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"arshadshmim786@gmail.com",
            pass:"csmc zgbc kuby igrj"
        }
    });

    const mailOptions = {
        from:"arshadshmim786@gmail.com",
        to:"arshadshamim555@gmail.com",
        subject:"Email Verification",
        html: `<p>Click ${link} to verify your email.</p>`
    }

    transpoter.sendMail(mailOptions,(error,info)=>{
        if(error)
            console.log("error",error);
        else
            console.log("successfully",info.response);
    })

    res.end();
});

app.listen(2000,(err)=>{
    if(err)
        console.log(err);
    else
        console.log("server started");
});