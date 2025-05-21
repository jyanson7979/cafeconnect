
const express = require('express');
const twilio = require('twilio');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());


const accountSid = process.env.TWILIO_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

app.post('/send-sms', (req, res) => {
  const { phone } = req.body;

  client.messages
    .create({
      body: 'Thanks for visiting But First, Coffee - Valencia Branch!',
      from: process.env.TWILIO_PHONE,
      to: phone
    })
    .then(message => {
      res.json({ success: true, sid: message.sid });
    })
    .catch(err => {
      res.status(500).json({ success: false, error: err.message });
    });
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
