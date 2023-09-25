function OnLoadScript() {


// content Name
let _contentName = "Avatar";

// content Title
let _contentTitle = "Avatar";
    


// Watch Order
let _watchOrder = [
    {title:"Avatar_1", contentType:"M"},
    {title:"Avatar_2", contentType:"M"},
]

// Description
let _readableDescription = [
    "Jake Sully and his adventures on the planet Pandora.",
];

data = {
    contentName:_contentName,
    title:_contentTitle,
    watchOrder:_watchOrder,
    readableDescription:_readableDescription,
}


// Spawning the data
SpawnCollectionInfoFromData(data);



}
OnLoadScript();