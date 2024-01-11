/* require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json())

app.use(cors({ origin: "*" }));



app.get("/", async (req, res) => {
    try {
        const ip = 
        req.headers['cf-connecting-ip'] ||  
        req.headers['x-real-ip'] ||
        req.headers['x-forwarded-for'] ||
        req.socket.remoteAddress || '';

console.log(ip)

        res.json({status:true , message:'sucessFully got ip', userIP:ip});
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong", status: 500 });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
 */


///////////////////////////////////////////////////

/* 
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const requestIp = require("request-ip");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(requestIp.mw());

app.get("/", async (req, res) => {
    try {
        const publicIP = req.clientIp;
        const localIP = req.connection.remoteAddress;

        res.json({
            status: true,
            message: 'Successfully got IPs',
           publicIp: publicIP,
           PrivateDeviceIP: localIP,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong", status: 500 });
    }
});

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});






 */


///////////////////////////////////////////////////////////
/* 
require("dotenv").config();

const express = require("express");
const cors = require("cors");
const requestIp = require("request-ip");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));
app.use(requestIp.mw());

app.get("/", async (req, res) => {
    try {
        const publicIP = req.clientIp;
        const localIP = getClientLocalIP(req);

        res.json({
            status: true,
            message: 'Successfully got IPs',
            publicIP,
            localIP,
        });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ message: "Something went wrong", status: 500 });
    }
});


function getClientLocalIP(req) {
    const ipv4 = req.connection.remoteAddress;
    const ipv6 = req.headers['x-forwarded-for'] || req.socket.remoteAddress;

    
    return ipv4.includes('::1') ? ipv6 : ipv4;
}

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
 */



require("dotenv").config();
const express = require("express");
const cors = require("cors");
 
const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

// IP Service

const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const uuidFilePath = 'device_uuid.txt';

let deviceIdentifier;

// Read the device identifier from a file, or generate a new one
try {
    deviceIdentifier = fs.readFileSync(uuidFilePath, 'utf8');
} catch (err) {
    deviceIdentifier = uuidv4();
    fs.writeFileSync(uuidFilePath, deviceIdentifier);
}

console.log('Device Identifier:', deviceIdentifier);

// Rest of your server setup...

// Example route using the device identifier
app.get('/', (req, res) => {
    res.json({ deviceIdentifier });
});

// Rest of your server setup...

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});


