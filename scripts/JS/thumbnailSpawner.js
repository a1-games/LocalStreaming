


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
    for (let i = 0; i < movies.length; i++) {
        AddThumbnail(movies[i], true, thumbnailrow_m);
    }
}



async function LoadAllSeriesThumbnails()
{
    var thumbnailrow_s = document.getElementById("thumbnailrow-series");

    // in the future this should also load in the movie data, description etc.
    for (let i = 0; i < series.length; i++) {
        AddThumbnail(series[i], false, thumbnailrow_s);
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




LoadAllMovieThumbnails();
LoadAllSeriesThumbnails();








