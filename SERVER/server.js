// Load Node modules
var http = require("http");
var fs = require("fs");

// base path
const { dirname } = require('path');
const rootDir = dirname(require.main.filename);
console.log(rootDir)

// packages
var express = require('express');
var fileUpload = require('express-fileupload');
var users = require('./users.js');
var whitelist = require('./whitelist.js');
var contentdata = require('./contentdata.js');
var { lookup } = require('geoip-lite');

// Initialise Express
var app = express();
// use file uploading
app.use(fileUpload());
// Render static files
app.use(express.static('WEBSITE'));
//app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));




app.post("/whitelistcheck", (req, res) => {


    let ip = req.body.ip;
    // check if username is taken
    let allowed = whitelist.IsWhitelisted(ip)
    try {
        if (allowed)
        {
            res.status(200).sendFile("WEBSITE/homepage.html", {root : rootDir} );
        }
        else{
            console.log(ip + " tried to connect, was blocked!");
            res.end();
    
            let data = lookup(ip);
            if (data != null)
            {
                users.WriteBlockedUser(ip, data);
            }
        }
    }
    catch (err)
    {
        res.status(500).send("Error: " + err);
    }

});


app.get("/users", (req, res) => {
    console.log(" / users called");
    // check if username is taken
    users.ReadUsers()
        .then(userList => {
            res.status(200).send(JSON.stringify(userList));
        })
});


app.post("/createUser", (req, res) => {
    console.log(" / createUser called" + req);
    let usnam = req.body.Username;
    let col = req.body.Color;
    let colscheme = req.body.ColorScheme;

    users.CreateUser(usnam, col, colscheme);

    // respond:
    // this forces a refresh. Ideally this wouldn't be the case but idk how to go around it
    //res.status(200).redirect("/");
});


app.post("/editUser", (req, res) => {
    console.log(" / createUser called" + req);
    let usnam = req.body.Username;
    let kte = req.body.KeyToEdit;
    let newValue = req.body.NewValue;

    // this will overwrite the given key for the given username
    users.EditUser(usnam, kte, newValue);

    // respond:
    // this forces a refresh. Ideally this wouldn't be the case but idk how to go around it
    //res.status(200).redirect("/");
});


app.post("/editContent", (req, res) => {
    console.log(" / editContent called" + req);
    let _contentType = req.body.ContentType;
    let _contentID = req.body.ContentID;
    let _newValue = req.body.NewValue;

    contentdata.WriteContentObject(_contentType, _contentID, _newValue);
});

// this works as a get but must be a post to contain a body
app.post("/contentObjects", (req, res) => {
    console.log(" / contentObjects called");
    console.log(req.body);
    let _contentType = req.body.ContentType;
    
    contentdata.ReadContentObjects(_contentType)
        .then(contentObjects => {
            res.status(200).send(JSON.stringify(contentObjects));
        });
});


app.post("/addthumbnail", (req, res) => {
    let image = Object.values(req.files)[0];
    //console.log(image)
    
    let path = "WEBSITE/" + Object.keys(req.files)[0];
    //console.log(path)

    contentdata.UploadThumbnail(image, path);

    res.sendStatus(200);
});



/*
var _server = http.createServer((req, res) =>
{
    var ip = req.ip 
            || req.connection.remoteAddress 
            || req.socket.remoteAddress 
            || req.connection.socket.remoteAddress;

    
    
            
    let allowed = whitelist.IsWhitelisted(ip);
    
    console.log("asdasdsdasdasd server pis")

    if(!allowed)
    {
        res.end(); // exit if it is a black listed ip
    }

})
app.server = _server;
*/


// Port website will run on
app.listen(3030);
