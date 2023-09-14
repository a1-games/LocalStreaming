


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
    // get the list of all movies
    await fetch('https://')
            .then((response) => response.json())
                .then((json) => console.log(json));




    for (let i = 0; i < 12; i++) {
        AddThumbnail("Shrek_1", true, thumbnailrow_m);
    }
}

async function LoadAllSeriesThumbnails()
{
    var thumbnailrow_m = document.getElementById("thumbnailrow-series");
    for (let i = 0; i < 12; i++) {
        AddThumbnail("Shrek_1", true, thumbnailrow_m);
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









