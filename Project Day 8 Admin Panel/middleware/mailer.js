const nodemailer = require("nodemailer");
const transport = nodemailer.createTransport({
    service: "gmail",
    auth:{
        user: "rutulkakadiya973@gmail.com",
        pass: "qdiznlziidlltezt"
    }
})

module.exports.sendOtp = (to, otp)=>{
    let mailOptions = {
        from: "rutulkakadiya973@gmail.com",
        to: to,
        subject: "Your password reset OTP",
        text: `Your otp is ${otp},`
    }

    transport.sendMail(mailOptions, (err)=>{
        err ? console.log(err): console.log("OTP send sucessfully...");
    })
}
