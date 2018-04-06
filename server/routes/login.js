const express = require("express");
const router = express.Router();
const { google } = require("googleapis");
const OAuth2 = google.auth.OAuth2;
const axios = require("axios");
const secrets = require("../secrets");
const jwt = require("jsonwebtoken");

const oauth2Client = new OAuth2(
    secrets.clientId,
    secrets.clientSecret,
    secrets.serverBase + "login/google"
);

const scopes = [
    "https://www.googleapis.com/auth/userinfo.email"
];

const url = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: scopes
});

router.get("/token", (req, res) => {
    try {
        let token = req.cookies.authToken;
        let decoded = jwt.verify(token, secrets.jwtSecret);
        if (secrets.mockEmails.includes(decoded.email)) {
            res.json({jwt: jwt.sign({email: decoded.email}, secrets.jwtSecret)});
        }
        throw "Invalid token/email";
    } catch(err) {
        console.log(err);
        res.redirect(url);
    }
});

router.get("/google", (req, res) => {
    console.log(req.query.code);
    oauth2Client.getToken(req.query.code, (err, tokens) => {
        if (!err) {
            oauth2Client.setCredentials(tokens);
            axios({
                method: "GET",
                url: "https://www.googleapis.com/oauth2/v2/userinfo",
                headers: {
                    "Authorization": `Bearer ${oauth2Client.credentials.access_token}`
                }
            }).then((result) => {
                debugger;
                console.log(result);
                res.cookie("authToken", jwt.sign({email: result.data.email}, secrets.jwtSecret), {
                    maxAge: 86400 * 1000 // 24 hours
                });
                res.redirect("/login/token");
            });
        }
    })
});

module.exports = router;
