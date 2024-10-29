function sendEmail(req,res){
    const email = req.body.email;
    console.log(email);
    req.end();
}


export{sendEmail}