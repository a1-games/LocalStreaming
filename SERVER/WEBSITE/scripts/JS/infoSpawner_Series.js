


async function SpawnSeriesInfoFromData(seriesData)
{
    var titlediv = document.getElementById("info-title");
    var descElem = document.getElementById("info-description");

    titlediv.innerText = seriesData.title;

    let seriesDescription = "";
    for (let i = 0; i < seriesData.readableDescription.length; i++) {
        if (i != 0)
        seriesDescription += "\n";
        seriesDescription += seriesData.readableDescription[i];
    }
    
    // use the collection's data
    descElem.innerText = seriesDescription;

    // spawn thumb row
    let parent = document.getElementById("episodes")
    SpawnThumbnailRow(parent, "S", "Season 1")
    
    // spawn thumbnails
    let thumbRow = document.getElementById(`thumbnailrow-${ContentID["S"]}`);

    // spawn season one, let user change it themselves
    for (let i = 0; i < seriesData.seasons[0].episodeCount; i++) {
        var onclick = function() {
            // play the video
        };
        AddThumbnail(`${seriesData.contentName}_S${1}E${i+1}`, `${ContentFolder["S"]}/${seriesData.contentName}/Episodes/S${1}E${i+1}.jpg`, thumbRow, onclick, `Episode ${i+1}`);
    }

    
    ResizeAllThumbnailDivs();

    // remove the script again in case we need it another time
    document.getElementById(seriesData.contentName).remove();
}

