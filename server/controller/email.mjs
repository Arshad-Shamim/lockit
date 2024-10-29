import nodemailer from 'nodemailer';

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
        body:body
    };

    transpoter.sendMail(mailOptions,(err,info)=>{
        if(err)
            console.log(err);
        else
            console.log(info.response);
    });
}

function sendEmail(req,res){
    const email = req.body.email;
    const subject = "testing....";
    const body="good evening arshad";
    const recevier = "arshadshamim555@gmail.com";
    sendMail(recevier,subject,body);
    req.end();
}


export{sendEmail}