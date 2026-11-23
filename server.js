const express = require('express');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');
const app = express();
const port = 3001;

// YOUR AGORA KEYS
const APP_ID = "69340f8cdf754bac85fab9621b569243";
const APP_CERTIFICATE = "ecc54c8335f945708fe306d3d59d32cf";

// Allow requests from your local app
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    next();
});

app.get('/token', (req, res) => {
    const channelName = req.query.channel;
    const uid = 0; // Fixed UID of 0 for testing
    
    if (!channelName) {
        return res.status(400).json({ error: 'Channel name is required' });
    }

    const role = RtcRole.PUBLISHER;
    const expirationTimeInSeconds = 3600; 
    const currentTimestamp = Math.floor(Date.now() / 1000);
    const privilegeExpiredTs = currentTimestamp + expirationTimeInSeconds;

    // Generate the token
    const token = RtcTokenBuilder.buildTokenWithUid(APP_ID, APP_CERTIFICATE, channelName, uid, role, privilegeExpiredTs);
    
    console.log("Generated Token for channel:", channelName);
    res.json({ token: token });
});

module.exports = app;

