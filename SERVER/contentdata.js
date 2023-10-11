var fs = require("fs");
var promises = require("fs").promises;
var util = require("util");


JsonName = {
    //key : filename
    S:"SERIES",
    M:"MOVIES",
    C:"COLLECTIONS",
};    

ContentID = {
    //key : foldername
    S:"series",
    M:"movies",
    C:"collections",
    I:"collectioninfo",
    E:"episodes",
};






async function ReadContentObjects(contentType)
{
    let fileData = await promises.readFile(`WEBSITE/files/${JsonName[contentType]}.json`, 'utf8');
    return JSON.parse(fileData);
}




async function WriteContentObject(contentType, contentID, data)
{
    // get the selected object
    let obj = await ReadContentObjects(contentType);

    // change the data
    obj[contentID] = data;

    // convert to json
    let json = JSON.stringify(obj, null, 2);
    // save to file
    fs.writeFile(`WEBSITE/files/${JsonName[contentType]}.json`, json, function(err) {
        if (err) {
            // there should never happen an error, this is just for good measure
            console.log(err);
        }
    });
}


async function UploadThumbnail(image, path)
{
    fs.mkdir(path, (error) => {
        console.log("- Safe Error: Tried creating path that already exists.");
    });

    if (fs.existsSync(`${path}/thumbnail.jpg`))
    {
        fs.renameSync(`${path}/thumbnail.jpg`, `${path}/thumbnail_old_${GetRandomChars(8)}.jpg`)
        console.log("Renamed old thumbnail image");
    }

    // Move the uploaded image to our upload folder
    image.mv(`${path}/thumbnail.jpg`);

    console.log("Uploaded image to " + path);
}




function GetRandomChars(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}





module.exports = { ReadContentObjects, WriteContentObject, UploadThumbnail };
