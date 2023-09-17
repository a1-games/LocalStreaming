function OnLoadScript() {

// Watch Order
let watchOrder = [
    {title:"Star_Wars_4", contentType:"M"}, // A New Hope
    {title:"Rogue_One", contentType:"M"},
    {title:"Star_Wars_5", contentType:"M"}, // Empire Strikes Back
    {title:"Star_Wars_1", contentType:"M"}, // Phantom Menace
    {title:"Star_Wars_2", contentType:"M"}, // Attack of the Clones
    {title:"Star_Wars_3", contentType:"M"}, // Revenge of the Sith
    {title:"Star_Wars_6", contentType:"M"}, // Return of the jedi
    {title:"Han_Solo_1", contentType:"M"}, // Solo: A Star Wars Story
    {title:"Star_Wars_7", contentType:"M"}, // The Force Awakens
    {title:"Star_Wars_8", contentType:"M"}, // The Last Jedi
    {title:"Star_Wars_9", contentType:"M"}, // The Rise of Skywalker
]

// Description
let readableDescription = [
    "All Star Wars movies in the correct viewing order, according to some superfan that wrote an article about it.",
    "The list is missing some series but I'm not gonna bother with those. All the movies from the list are included.",
];
let collectionDescription = "";
for (let i = 0; i < readableDescription.length; i++) {
    if (i != 0)
    collectionDescription += "\n";
collectionDescription += readableDescription[i];
}


// Spawning the data
SpawnCollectionInfoFromData("Star_Wars", watchOrder, collectionDescription);


}
OnLoadScript();