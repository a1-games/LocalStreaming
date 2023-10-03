




async function SetEpisodeInfo(seriesObject, seasonIndex, episodeIndex)
{
    var epidiv = document.getElementById("episode-title");
    var epithumb = document.getElementById("episode-thumbnail");

    epidiv.innerText = seriesObject.seasons[seasonIndex].episodes[episodeIndex].title;
    let S = parseInt(seasonIndex)+1;
    epithumb.style.backgroundImage = `url('Content/Series/${seriesObject.contentID}/Season_${S}/S${S}E${episodeIndex+1}.jpg')`;

}




function SpawnSeriesEpisodes(seriesObject, seasonIndex)
{
    let thumbRow = document.getElementById(`thumbnailrow-episodes`);

    let S = parseInt(seasonIndex)+1;
    
    // spawn season one, let user change it themselves
    for (let i = 0; i < seriesObject.seasons[seasonIndex].episodes.length; i++) {
        var onclick = function() {
            // set the description info
            SetEpisodeInfo(seriesObject, seasonIndex, i);
            selectedEpisode = i;
            // play the video'
            LoadVideo();
        };
        AddThumbnail(`${seriesObject.contentID}_S${S}E${i+1}`, `Series/${seriesObject.contentID}/Season_${S}/S${S}E${i+1}.jpg`, thumbRow, onclick, `${seriesObject.seasons[seasonIndex].episodes[i].title}`);
    }

    LoadWatchProgressForContentType("E");
}

async function ClearEpisodes()
{
    let thumbRow = document.getElementById(`thumbnailrow-episodes`);
    let test = thumbRow.querySelectorAll(".content-thumbnail");
    for (let i = 0; i < test.length; i++) {
        test[i].remove();
    }
    // clear references
    thumbRowObjects[`thumbnailrow-episodes`].thumbnails = [];

}


async function SelectSeason(seasonIndex)
{
    ClearEpisodes();
    selectedSeason = seasonIndex;
    var seriesObject = seriesObjects[localStorage.getItem("selectedContent")];
    SpawnSeriesEpisodes(seriesObject, seasonIndex)

    
    // set the episodes to start index 0
    SetThumbRowObjectValues(thumbRowObjects[`thumbnailrow-episodes`], 0, 0);
    
    ResizeAllThumbnailDivs();
}






