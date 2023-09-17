var fs = require("fs").promises;
var util = require("util");


async function CreateUser(username, usercolor)
{
    users = await ReadUsers();
    WriteUser(users, username, usercolor);
}


async function ReadUsers()
{
    let fileData = await fs.readFile(`WEBSITE/files/USERS.json`, 'utf8');
    return JSON.parse(fileData);
}


function WriteUser(users, username, usercolor)
{
    // add this to the existing file
    var playerData = {};
    playerData.Username = username;
    playerData.Color = usercolor;

    users.push(playerData);
    let pD = JSON.stringify(users);

    fs.writeFile(`WEBSITE/files/USERS.json`, pD, function(err) {
        if (err) {
            // there should never happen an error, this is just for good measure
            console.log(err);
        }
    });
}



module.exports = { CreateUser, ReadUsers };

console.log("Server was started");