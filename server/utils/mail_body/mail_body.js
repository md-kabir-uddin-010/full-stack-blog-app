exports.mail_body = (sitename, otp_code, mail_name, exp_time) => {
  const mail = `<h1>Verify Your E-mail Address</h1><p>Hi,</p><p>You are almost ready to begin. Give us the OTP code below to verify your email address!</p><strong>Your code is: <strong><b>${otp_code}</b></strong></strong><p>Please enter <strong><b>${otp_code}</b></strong> within the next  ${exp_time} minutes to finish confirming your email.</p><p>Thanks for ${mail_name}!</p><p>Copyrights © <b>${sitename}</b> All Rights Reserved</p>`;

  return mail;
};
