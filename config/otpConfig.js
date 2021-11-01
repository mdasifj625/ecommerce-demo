const bcrypt = require('bcryptjs');
const accountSid = process.env.TWILIOt_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

exports.sendOTP = async (user) => {
    // Generate a random 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000);


    // Encrypt and and store OTP to Database
    user.phoneOtp = await bcrypt.hash(`${otp}`, 12);
    user.otpExpires = Date.now() + 10 * 60 * 1000;

    await user.save({ validateBeforeSave: false });

    // Send otp to the user

    await client.messages
        .create({
            body: `Your OTP to log in to your account is ${otp}. Do not share your OTP with anyone. Valid Only for 10 Minutes - Team Solulab`,
            from: process.env.MESSAGE_FROM,
            to: `+91${user.phone}`
        });

}

exports.verifyOTP = async (userEnteredOTP, savedOTP) => {
    return await bcrypt.compare(userEnteredOTP, savedOTP);
}







