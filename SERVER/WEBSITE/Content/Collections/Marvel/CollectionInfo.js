// Watch Order
let watchOrder = [
    {title:"Inception", contentType:"M"},
    {title:"Shrek_1", contentType:"M"},
    {title:"Friends", contentType:"S"},
]

// Description
let readableDescription = [
    "This is line 1",
    "This is line 2",
    "This is line 3",
    "This is line 4",
    "This is line 5",
    "This is line 6",
];
let collectionDescription = "";
for (let i = 0; i < readableDescription.length; i++) {
    if (i != 0)
    collectionDescription += "\n";
collectionDescription += readableDescription[i];
}


// Spawning the data
SpawnCollectionInfoFromData(watchOrder, collectionDescription);

