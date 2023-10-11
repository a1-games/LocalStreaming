var fs = require("fs").promises;
var util = require("util");


async function CreateUser(username, usercolor, colorscheme)
{
    users = await ReadUsers();
    WriteUser(users, username, usercolor, colorscheme);
}


async function ReadUsers()
{
    let fileData = await fs.readFile(`WEBSITE/files/USERS.json`, 'utf8');
    return JSON.parse(fileData);
}


function WriteUser(users, username, usercolor, colorscheme)
{
    // add this to the existing file
    var playerData = {};
    playerData.Username = username;
    playerData.Color = usercolor;
    playerData.ColorScheme = colorscheme;

    console.log("Wrote user data: " + username + " | " + usercolor + " | " + colorscheme)

    users[username] = playerData;
    let pD = JSON.stringify(users, null, 2);

    fs.writeFile(`WEBSITE/files/USERS.json`, pD, function(err) {
        if (err) {
            // there should never happen an error, this is just for good measure
            console.log(err);
        }
    });
}

async function EditUser(username, keyToEdit, newValue)
{
    users = await ReadUsers();
    
    users[username][keyToEdit] = newValue;
    console.log("Changed user data: " + keyToEdit + " | " + newValue + " for user " + username)

    let pD = JSON.stringify(users);

    fs.writeFile(`WEBSITE/files/USERS.json`, pD, function(err) {
        if (err) {
            // there should never happen an error, this is just for good measure
            console.log(err);
        }
    });
}



module.exports = { CreateUser, ReadUsers, EditUser };

console.log("Server was started");