









function SpawnSeriesEpisodes(seriesObject, seasonIndex)
{
    let thumbRow = document.getElementById(`thumbnailrow-${ContentID["S"]}`);
    let thumbRowTitle =  document.getElementById(`title-series`);
    
    let S = parseInt(seasonIndex)+1;
    thumbRowTitle.innerText = `Season ${S}`;

    // spawn season one, let user change it themselves
    for (let i = 0; i < seriesObject.seasons[seasonIndex].episodes.length; i++) {
        var onclick = function() {
            // play the video
        };
        AddThumbnail(`${seriesObject.contentID}_S${S}E${i+1}`, `Series/${seriesObject.contentID}/Season_${S}/S${S}E${i+1}.jpg`, thumbRow, onclick, `${seriesObject.seasons[seasonIndex].episodes[i].title}`);
    }
}

async function ClearEpisodes()
{
    let thumbRow = document.getElementById(`thumbnailrow-${ContentID["S"]}`);
    let test = thumbRow.querySelectorAll(".content-thumbnail");
    for (let i = 0; i < test.length; i++) {
        test[i].remove();
    }
    // clear references
    thumbRowObjects[`thumbnailrow-${ContentID["S"]}`].thumbnails = [];
}


async function SelectSeason(seasonIndex)
{
    ClearEpisodes();
    var seriesObject = seriesObjects[localStorage.getItem("selectedContent")];
    SpawnSeriesEpisodes(seriesObject, seasonIndex)

    ResizeAllThumbnailDivs();
}






