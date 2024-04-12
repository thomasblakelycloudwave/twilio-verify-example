require('dotenv').config();

const {
  ACCOUNT_SID,
  API_KEY,
  API_SECRET,
  CHANNEL,
  EMAIL_ADDRESS,
  PHONE_NUMBER,
  VERIFY_SERVICE_SID
} = process.env;

if (
  !ACCOUNT_SID,
  !API_KEY,
  !API_SECRET,
  !CHANNEL,
  !VERIFY_SERVICE_SID,
  (!EMAIL_ADDRESS && !PHONE_NUMBER)
) {
  console.error("Missing environment variables. Unable to proceed. ");
  return;
}

if (!CHANNEL || !["email", "sms"].includes(CHANNEL)) {
  console.error(`channel must be set to either 'email' or 'sms', not: ${CHANNEL}`);
  return;
}

const TO_ADDRESS = CHANNEL == "email" ? EMAIL_ADDRESS : PHONE_NUMBER;
const twilio = require('twilio')(API_KEY, API_SECRET, { accountSid: ACCOUNT_SID });
const verify = twilio.verify.v2.services(VERIFY_SERVICE_SID);
const readline = require('readline');

async function fetchVerification(verify, sid) {
  try {
    return await verify.verifications(sid).fetch();
  } catch (error) {
    console.error("Error fetching verification:", error);
  }
}

async function createVerification(verify) {
  try {
    return await verify.verifications.create({
      to: TO_ADDRESS,
      channel: CHANNEL
    });
  } catch (error) {
    console.error("Error creating verification:", error);
  }
}

async function checkVerificationCode(verify, sid, code) {
  try {
    return await verify.verificationChecks.create({
      verificationSid: sid,
      code: code,
    });
  } catch (error) {
    console.error("Error checking verification code:", error);
  }
}

async function promptVerificationCode(verify, sid) {
  return new Promise((resolve, reject) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    rl.question("Enter the verification code: ", async (code) => {
      rl.close();
      try {
        const verificationCode = await checkVerificationCode(verify, sid, code);
        console.log("Verification was Successful. ");
        resolve(verificationCode);
      } catch (error) {
        reject(error);
      }
    });
  });
}

async function main() {
  try {
    const verificationRequest = await createVerification(verify);
    const verificationSid = verificationRequest.sid;
    const verificationData = await fetchVerification(verify, verificationSid);
    const verificationCode = await promptVerificationCode(verify, verificationSid);
    //TODO, as you wish...
  } catch (error) {
    console.error("Error in main function:", error);
  }
  return;
}

main();