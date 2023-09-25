function OnLoadScript() {


// content Name
let _contentName = "Breaking_Bad";

// content Title
let _contentTitle = "Breaking Bad";
    

// Watch Order
let _seasons = [
    {episodeCount:"12"},
    {episodeCount:"12"},
]

// Description
let _readableDescription = [
    "A chemistry teacher and a drug addict start a suspicious business together.",
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