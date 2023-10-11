// Load Node modules
var http = require('http');
var express = require('express');
var fileUpload = require('express-fileupload');
var users = require('./users.js');
var contentdata = require('./contentdata.js');

// Initialise Express
var app = express();
// use file uploading
app.use(fileUpload());
// Render static files
app.use(express.static('WEBSITE'));
//app.use(express.urlencoded({ extended: false }));
app.use(express.json({ extended: false }));


app.get("/users", (req, res) => {
    // check if username is taken
    users.ReadUsers()
        .then(userList => {
            res.status(200).send(JSON.stringify(userList));
        })
});


app.post("/createUser", (req, res) => {
    let usnam = req.body.Username;
    let col = req.body.Color;
    let colscheme = req.body.ColorScheme;

    users.CreateUser(usnam, col, colscheme);

    // respond:
    // this forces a refresh. Ideally this wouldn't be the case but idk how to go around it
    //res.status(200).redirect("/");
});


app.post("/editUser", (req, res) => {
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
    let _contentType = req.body.ContentType;
    let _contentID = req.body.ContentID;
    let _newValue = req.body.NewValue;

    contentdata.WriteContentObject(_contentType, _contentID, _newValue);
});

// this works as a get but must be a post to contain a body
app.post("/contentObjects", (req, res) => {
    let _contentType = req.body.ContentType;
    
    contentdata.ReadContentObjects(_contentType)
        .then(contentObjects => {
            res.status(200).send(JSON.stringify(contentObjects));
        })
});


app.post("/addthumbnail", (req, res) => {
    let image = Object.values(req.files)[0];
    //console.log(image)
    
    let path = "WEBSITE/" + Object.keys(req.files)[0];
    //console.log(path)

    contentdata.UploadThumbnail(image, path);

    res.sendStatus(200);
});


// Port website will run on
app.listen(3030);
