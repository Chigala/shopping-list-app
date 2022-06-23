const nodemailer = require("nodemailer");
const {google} = require("googleapis")
require("dotenv").config(); 

const sendEmail = async (link,email) => {
  const oAuth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.REDIRECT_URI,
  );
  oAuth2Client.setCredentials({refresh_token:process.env.REFRESH_TOKEN})
  const accessToken = oAuth2Client.getAccessToken
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'OAuth2',
          user: process.env.EMAIL,
          // pass: process.env.PASSWORD,
          clientId: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: accessToken
        }
      });
    
      let mailOptions = {
        from: "JAPANESE INVESTORS",
        to:`${email}`,  
        subject: 'TESTING TESTING TESTING!!!',
        html: `<p>This is the link I always wanted to send to you and here is it <a href=${link}>click on this to change your password</a> </p>`
      };

      try{
          await transporter.sendMail(mailOptions); 
          console.log("the email has been sent")
      }
      catch(err){
          console.log(err)
      }

}

module.exports = sendEmail; 