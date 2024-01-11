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
const requestIp = require("request-ip");

const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());
app.use(cors({ origin: "*" }));

// Middleware to get client IP address
app.use(requestIp.mw());

app.get("/", async (req, res) => {
    try {
        const publicIP = req.clientIp; // Public IP address
        const localIP = req.connection.remoteAddress; // Local IP address

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

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
