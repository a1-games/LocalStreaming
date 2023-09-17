// Load Node modules
var http = require('http');
var express = require('express');
var users = require('./users.js');

// Initialise Express
var app = express();
// Render static files
app.use(express.static('WEBSITE'));
app.use(express.urlencoded({ extended: false }));


app.get("/users", (req, res) => {
    // check if username is taken
    let userList = users.ReadUsers();
    // respond:
    res.send(userList)
});

app.post("/createUser", (req, res) => {
    // check if username is taken
    // if not:
    let usnam = req.body.Username;
    let col = req.body.Color;

    users.CreateUser(usnam, col);

    // respond:
    // this forces a refresh. Ideally this wouldn't be the case but idk how to go around it
    res.status(200).redirect("/");
});



// Port website will run on
app.listen(3030);
