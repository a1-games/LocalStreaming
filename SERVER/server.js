// Load Node modules
var express = require('express');
// Initialise Express
var app = express();
// Render static files
app.use(express.static('WEBSITE'));
// Port website will run on
app.listen(3030);




