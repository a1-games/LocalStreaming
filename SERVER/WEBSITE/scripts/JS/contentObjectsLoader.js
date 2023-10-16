






movieObjects = {};
seriesObjects = {};
collectionObjects = {};


async function GetContentObjects(contentType)
{
    let response = await fetch(`/contentObjects`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ContentType:contentType}),
    });
    return await response.json();
}


async function LoadRowSeperately( func )
{
    func();
}



async function LoadThumbRowsForAdmin()
{
    movieObjects = await GetContentObjects("M");
    SpawnMovieThumbs();

    seriesObjects = await GetContentObjects("S");
    SpawnSeriesThumbs();

    collectionObjects = await GetContentObjects("C");
    SpawnCollectionThumbs();
}



async function LoadThumbRowsForClient()
{
    let mainBox = document.getElementById("main-content-box");


    // load series

    seriesObjects = await GetContentObjects("S");
            
    SpawnThumbnailRow(mainBox, "S", "Series", seriesObjects);

    LoadWatchProgressForContentType("S");



    // load movies

    movieObjects = await GetContentObjects("M");
    movies = {};
    Object.keys(movieObjects).forEach(movieKey => {
        if (!hiddenMovies.includes(movieKey))
        {
            movies[movieKey] = movieObjects[movieKey];
        }
    });
    
    SpawnThumbnailRow(mainBox, "M", "Movies", movies);

    LoadWatchProgressForContentType("M");
    


    // load collections

    collectionObjects = await GetContentObjects("C");
            
    SpawnThumbnailRow(mainBox, "C", "Collections", collectionObjects);

    LoadWatchProgressForContentType("C");
    
    ResizeAllThumbnailDivs();
            
}










































