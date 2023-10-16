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
    let writeData = JSON.stringify(users, null, 2);

    fs.writeFile(`WEBSITE/files/USERS.json`, writeData, function(err) {
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

    let writeData = JSON.stringify(users, null, 2);

    fs.writeFile(`WEBSITE/files/USERS.json`, writeData, function(err) {
        if (err) {
            // there should never happen an error, this is just for good measure
            console.log(err);
        }
    });
}


async function WriteBlockedUser(ip, data)
{
    let fileData = await fs.readFile(`WEBSITE/files/BLACKLIST.json`, 'utf8');
    let blacklist = JSON.parse(fileData);

    blacklist[ip] = data;

    let writeData = JSON.stringify(blacklist, null, 2);

    fs.writeFile(`WEBSITE/files/BLACKLIST.json`, writeData, function(err) {
        if (err) {
            // there should never happen an error, this is just for good measure
            console.log(err);
        }
    });

    console.log("Wrote data to BLACKLIST ( " + ip + " ).");
}



module.exports = { CreateUser, ReadUsers, EditUser, WriteBlockedUser };

console.log("Server was started");