function OnLoadScript() {

    
// content Name
let _contentName = "Game_Of_Thrones";

// content Title
let _contentTitle = "Game Of Thrones";
    

// seasons in order with their episode count
let _seasons = [
    {episodeCount:"2"},
]

// Description
let _readableDescription = [
    "The start of the great game of thrones",
];

data = {
    contentName:_contentName,
    title:_contentTitle,
    seasons:_seasons,
    readableDescription:_readableDescription,
}

// Spawning the data
SpawnSeriesInfoFromData(data);



}
OnLoadScript();