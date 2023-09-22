
let rndSeries = []
let rndMovies = []
let rndCollections = []

var seriesThumbElems = []
var moviesThumbElems = []
var collectionsThumbElems = []

ContentFolder = {
    //key : foldername
    S:"Series",
    M:"Movies",
    C:"Collections",
};

function RandomizeSeriesList()
{
    rndSeries = [];
    _series = [...series]
    let len = _series.length > 20 ? 20 : _series.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _series.length);
        rndSeries[i] = (_series[rnd]);
        _series.splice(rnd, 1);
    }
}
function RandomizeMoviesList()
{
    rndMovies = [];
    _movies = [...movies]
    let len = _movies.length > 20 ? 20 : _movies.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _movies.length);
        rndMovies[i] = (_movies[rnd]);
        _movies.splice(rnd, 1);
    }
}
function RandomizeCollectionsList()
{
    rndCollections = [];
    _collections = [...collections]
    let len = _collections.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _collections.length);
        rndCollections[i] = (_collections[rnd]);
        _collections.splice(rnd, 1);
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
    
    if (contentFolder == "Series")
    {
        clickableElement.onclick = function() {
            // set the selected content
            localStorage.setItem("selectedContent", contentName);
            // load the page
            LoadPage("series");
        };
    }
    
    if (contentFolder == "Movies")
    {
        // finnd a better way to do this:
        moviesThumbElems.push(clickableElement);
        clickableElement.onclick = function() {
            // set the selected content
            localStorage.setItem("selectedContent", contentName);
            // load the page
            LoadPage("movies");
        };
    }

    if (contentFolder == "Collections")
    {
        clickableElement.onclick = function() {
            // set the selected content
            localStorage.setItem("selectedContent", contentName);
            // load the page
            // load the page
            LoadPage("collection");
        };
    }


    clickableElement.id = contentName;
    clickableElement.style.backgroundImage = `url('Content/${contentFolder}/${contentName}/thumbnail.jpg')`;

    parent.append(clickableElement);
}









