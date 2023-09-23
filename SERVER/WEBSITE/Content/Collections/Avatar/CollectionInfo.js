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

// Spawning the data
SpawnCollectionInfoFromData("Avatar", watchOrder, readableDescription);



}
OnLoadScript();