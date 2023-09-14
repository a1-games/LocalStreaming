
let rndSeries = []
let rndMovies = []

function RandomizeSeriesList()
{
    rndSeries = []
    let len = series.length;
    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * series.length);
        rndSeries[i] = (series[rnd]);
        series.splice(rnd, 1);
    }
}
function RandomizeMoviesList()
{
    rndMovies = []
    let len = movies.length;
    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * movies.length);
        rndMovies[i] = (movies[rnd]);
        movies.splice(rnd, 1);
    }
}


async function LoadTestThumbnails()
{
    var thumbnailrow_m = document.getElementById("thumbnailrow-movies");
    for (let i = 0; i < 12; i++) {
        AddThumbnail("Shrek_1", true, thumbnailrow_m);
    }
    var thumbnailrow_s = document.getElementById("thumbnailrow-series");
    for (let i = 0; i < 12; i++) {
        AddThumbnail("Friends", false, thumbnailrow_s);
    }
}








async function LoadAllMovieThumbnails()
{
    var thumbnailrow_m = document.getElementById("thumbnailrow-movies");

    // in the future this should also load in the movie data, description etc.
    for (let i = 0; i < rndMovies.length; i++) {
        AddThumbnail(rndMovies[i], true, thumbnailrow_m);
    }
}



async function LoadAllSeriesThumbnails()
{
    var thumbnailrow_s = document.getElementById("thumbnailrow-series");

    // in the future this should also load in the movie data, description etc.
    for (let i = 0; i < rndSeries.length; i++) {
        AddThumbnail(rndSeries[i], false, thumbnailrow_s);
    }
}




async function AddThumbnail(contentName, contentIsMovie, parent)
{
    var clickableElement = document.createElement("a");
    clickableElement.className = "content-thumbnail";
    clickableElement.href = "#"; // should be to play the video
    clickableElement.id = contentName;
    clickableElement.style.backgroundImage = `url('Content/${contentIsMovie ? "Movies" : "Series"}/${contentName}/thumbnail.jpg')`;

    parent.append(clickableElement);
}



RandomizeSeriesList();
RandomizeMoviesList();

LoadAllMovieThumbnails();
LoadAllSeriesThumbnails();








