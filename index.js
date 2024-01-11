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
const axios = require("axios");

const app = express();

const port = process.env.PORT || 5000;

app.use(cors({ origin: "*" }));

// IP Service

const getIPDetailsService = async (ip_address) => {
	try {
		const response = await axios.get(`http://ip-api.com/json/${ip_address}?fields=status,message,continent,continentCode,country,countryCode,region,regionName,city,district,zip,lat,lon,timezone,offset,currency,isp,org,as,mobile,proxy,hosting,query`);
console.log(response)
		if (response.status === 200 && response.data.status === "success") {
			return { data: response.data, status: 200 };
		} else {
			throw new Error("API request failed");
		}
	} catch (error) {
		console.error("Error:", error.message);
		return { message: "Something went wrong", status: 500 };
	}
};

// IP Controller

const getIPDetails = async (req, res) => {

	res.setHeader("Content-Type", "application/json");

	const { ip_address } = req.params;
	try {
		const result = await getIPDetailsService(ip_address);

		return res.json(result);
	} catch (error) {
		console.error("Error:", error);
		return res.status(500).json({ message: "Something went wrong", status: 500 });
	}
};

// Routes

const router = express.Router();


router.get("/get-details/:ip_address", getIPDetails);

// Main route for getting user IP

router.get("/", (req, res) => {
	const ip = req.headers["x-forwarded-for"] || req.ip || req.socket.localAddress;
	console.log("IP:", ip);
	res.json({ ip });
});

// App setup

app.use(router);

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});