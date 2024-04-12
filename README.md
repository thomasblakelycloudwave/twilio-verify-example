# twilio-verify-example

Simulates the MFA process. Supports sms and email channel. 

# Prerequisite Requirements

A working Twilio Verify service, a standard set of Twilio REST API Keys.

# Setup

1. Install simply: `npm install`
2. create `.env`: `cp env.example .env` (fill in the blanks)

# Use

1. Run simply: `npm start`

# Example use

```bash
$ npm start

> twilio-verify-example@0.0.1 start
> node index.js

Enter the verification code: 289438
Verification was Successful. 
```

# Sources
1. [Twilio REST API Keys](https://www.twilio.com/docs/iam/api-keys)
2. [Twilio Verify API](https://www.twilio.com/docs/verify/api)
3. [Twilio Verifications](https://www.twilio.com/docs/verify/api/verification)
