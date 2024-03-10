import About from "../model/About.js"
import nodemailer from "nodemailer"
export const GetAbout= async (req, res) => {
About.find({}).then(function(doc) {
    if(doc)
    {
      res.json(doc)
   
    }
    else
    {
      res.json("Error")
    }
})


}
export const SendMail= async (req, res) => {

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
     user: process.env.EMAIL_ADDRESS,
     pass:process.env.EMAIL_ADDRESS_PASSWORD,
    },
   });
  // send mail with defined transport object

  var mailOptions = {
    from: process.env.EMAIL_ADDRESS,
    to: req.body.email,
    subject:req.body.subject,
    text:req.body.message
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      res.send(error);
    } else {
        res.send("sucess")
    }
  }); 

}