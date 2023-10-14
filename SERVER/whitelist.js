const { response } = require("express");

var fs = require("fs").promises;




var _whitelist = [];

async function PreloadWhitelist()
{
    _whitelist = await GetWhitelist();
}
PreloadWhitelist();


async function GetWhitelist()
{
    let fileData = await fs.readFile(`WEBSITE/files/WHITELIST.json`, 'utf8');
    return JSON.parse(fileData);
}


function IsWhitelisted(ip)
{
    for (let i = 0; i < _whitelist.length; i++) {
        if (ip == _whitelist[i])
        {
            // user is whitelisted
            return true;
        }
    }
    return false;
}





module.exports = { IsWhitelisted };























