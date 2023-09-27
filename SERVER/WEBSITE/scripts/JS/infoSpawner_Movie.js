





async function SpawnMovieInfo()
{
    var titlediv = document.getElementById("info-title");
    var descElem = document.getElementById("info-description");
    var thumb = document.getElementById("info-thumbnail");

    var movieObject = movieObjects[localStorage.getItem("selectedContent")];
    
    thumb.style.backgroundImage = `url('Content/Movies/${movieObject.contentID}/thumbnail.jpg')`;
    titlediv.innerText = movieObject.contentTitle;

    let movieDescription = "";
    for (let i = 0; i < movieObject.readableDescription.length; i++) {
        if (i != 0)
            movieDescription += "\n";
        movieDescription += movieObject.readableDescription[i];
    }
    
    // use the data
    descElem.innerText = movieDescription;

}


