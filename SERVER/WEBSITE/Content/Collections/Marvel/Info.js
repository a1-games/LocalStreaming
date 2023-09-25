function OnLoadScript() {


// content Name
let _contentName = "Marvel";

// content Title
let _contentTitle = "Marvel";
    

// Watch Order
let _watchOrder = [
    {title:"Spiderman_Toby_1", contentType:"M"},
    {title:"Spiderman_Toby_2", contentType:"M"},
    {title:"Spiderman_Toby_3", contentType:"M"},
    {title:"Spiderman_Andrew_1", contentType:"M"},
    {title:"Spiderman_Andrew_2", contentType:"M"},
    {title:"Captain_America_1", contentType:"M"},
    {title:"Captain_Marvel_1", contentType:"M"},
    {title:"Iron_Man_1", contentType:"M"},
    {title:"Iron_Man_2", contentType:"M"},
    {title:"The_Hulk_1", contentType:"M"},
    {title:"Thor_1", contentType:"M"},
    {title:"Avengers_1", contentType:"M"},
    {title:"Thor_2", contentType:"M"},
    {title:"Iron_Man_3", contentType:"M"},
    {title:"Captain_America_2", contentType:"M"},
    {title:"Guardians_Of_The_Galaxy_1", contentType:"M"},
    {title:"Guardians_Of_The_Galaxy_2", contentType:"M"},
    {title:"Avengers_2", contentType:"M"},
    {title:"Ant_Man_1", contentType:"M"},
    {title:"Catain_America_3", contentType:"M"},
    {title:"Black_Widow_1", contentType:"M"},
    {title:"Spiderman_Tom_1", contentType:"M"},
    {title:"Black_Panter_1", contentType:"M"},
    {title:"Doctor_Strange_1", contentType:"M"},
    {title:"Thor_3", contentType:"M"},
    {title:"Ant_Man_2", contentType:"M"},
    {title:"Avengers_3", contentType:"M"},
    {title:"Avengers_4", contentType:"M"},
    {title:"Loki_1", contentType:"S"},
    {title:"Spiderman_Tom_2", contentType:"M"},
    {title:"Shang_Chi_1", contentType:"M"},
    {title:"Eternals_1", contentType:"M"},
    {title:"Spiderman_Tom_3", contentType:"M"},
    {title:"Doctor_Strange_2", contentType:"M"},
    {title:"Thor_4", contentType:"M"},
    {title:"Black_Panter_2", contentType:"M"},
    {title:"Ant_Man_3", contentType:"M"},
    {title:"Guardians_Of_The_Galaxy_3", contentType:"M"},
    //"The_Marvels_1",
    //"Catain_America_4",
    //"Thunderbolts",
    //"Blade",
]

// Description
let _readableDescription = [
    "This is line 1",
    "This is line 2",
    "This is line 3",
    "This is line 4",
    "This is line 5",
    "This is line 6",
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