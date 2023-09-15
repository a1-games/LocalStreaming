
let rndSeries = []
let rndMovies = []
let rndCollections = []

ContentFolder = {
    //key : foldername
    S:"Series",
    M:"Movies",
    C:"Collections",
};

function RandomizeSeriesList()
{
    rndSeries = [];
    let len = series.length > 13 ? 13 : series.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * series.length);
        rndSeries[i] = (series[rnd]);
        series.splice(rnd, 1);
    }
}
function RandomizeMoviesList()
{
    rndMovies = [];
    let len = movies.length > 13 ? 13 : movies.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * movies.length);
        rndMovies[i] = (movies[rnd]);
        movies.splice(rnd, 1);
    }
}
function RandomizeCollectionsList()
{
    rndCollections = [];
    let len = collections.length > 13 ? 13 : collections.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * collections.length);
        rndCollections[i] = (collections[rnd]);
        collections.splice(rnd, 1);
    }
}



async function LoadAllMovieThumbnails()
{
    var thumbnailrow_m = document.getElementById("thumbnailrow-movies");

    // in the future this should also load in the movie data, description etc.
    for (let i = 0; i < rndMovies.length; i++) {
        AddThumbnail(rndMovies[i], ContentFolder.M, thumbnailrow_m);
    }
}

async function LoadAllSeriesThumbnails()
{
    var thumbnailrow_s = document.getElementById("thumbnailrow-series");

    // in the future this should also load in the movie data, description etc.
    for (let i = 0; i < rndSeries.length; i++) {
        AddThumbnail(rndSeries[i], ContentFolder.S, thumbnailrow_s);
    }
}

async function LoadAllCollectionsThumbnails()
{
    var thumbnailrow_c = document.getElementById("thumbnailrow-collections");

    // in the future this should also load in the movie data, description etc.
    for (let i = 0; i < rndCollections.length; i++) {
        AddThumbnail(rndCollections[i], ContentFolder.C, thumbnailrow_c);
    }
}




async function AddThumbnail(contentName, contentFolder, parent)
{
    var clickableElement = document.createElement("a");
    clickableElement.className = "content-thumbnail";
    clickableElement.href = "#"; // should be to play the video

    if (contentFolder == "Collections")
    {
        clickableElement.href = "collectioninfo.html";
    }

    clickableElement.onclick = function() { localStorage.setItem("selectedContent", contentName); console.log("pressed")};

    clickableElement.id = contentName;
    clickableElement.style.backgroundImage = `url('Content/${contentFolder}/${contentName}/thumbnail.jpg')`;

    parent.append(clickableElement);
}









