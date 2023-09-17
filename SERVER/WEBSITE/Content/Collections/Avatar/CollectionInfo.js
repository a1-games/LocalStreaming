function OnLoadScript() {

    

// Watch Order
let watchOrder = [
    {title:"Avatar_1", contentType:"M"},
    {title:"Avatar_2", contentType:"M"},
]

// Description
let readableDescription = [
    "Jake Sully and his adventures on the planet Pandora.",
];
let collectionDescription = "";
for (let i = 0; i < readableDescription.length; i++) {
    if (i != 0)
    collectionDescription += "\n";
collectionDescription += readableDescription[i];
}


// Spawning the data
SpawnCollectionInfoFromData("Avatar", watchOrder, collectionDescription);



}
OnLoadScript();