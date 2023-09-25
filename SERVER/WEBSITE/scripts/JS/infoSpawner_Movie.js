





async function SpawnMovieInfoFromData(movieName, readableDescription)
{
    var titlediv = document.getElementById("info-title");
    var descElem = document.getElementById("info-description");

    titlediv.innerText = movieName;

    let movieDescription = "";
    for (let i = 0; i < readableDescription.length; i++) {
        if (i != 0)
            movieDescription += "\n";
        movieDescription += readableDescription[i];
    }
    
    // use the data
    descElem.innerText = movieDescription;

    // remove the script again in case we need it another time
    document.getElementById(movieName).remove();
}


