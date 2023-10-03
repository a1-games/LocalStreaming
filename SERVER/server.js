// Load Node modules
var http = require('http');
var express = require('express');
var users = require('./users.js');

// Initialise Express
var app = express();
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





// Port website will run on
app.listen(3030);
