




async function SetEpisodeInfo(seriesObject, seasonIndex, episodeIndex)
{
    var epidiv = document.getElementById("info-title");
    var epidesc = document.getElementById("info-description");
    var epithumb = document.getElementById("info-thumbnail");

    let episodeObj = seriesObject.seasons[seasonIndex].episodes[episodeIndex];

    epidiv.innerText = episodeObj.title;
    // episodes only have one line descriptions
    epidesc.innerText = episodeObj.description;

    let S = parseInt(seasonIndex)+1;
    epithumb.style.backgroundImage = `url('Content/Series/${seriesObject.contentID}/Season_${S}/S${S}E${episodeIndex+1}.jpg')`;
}




function SpawnSeriesEpisodes(seriesObject, seasonIndex)
{
    let thumbRow = document.getElementById(`thumbnailrow-episodes`);

    let S = parseInt(seasonIndex)+1;
    
    // spawn season one, let user change it themselves
    //console.log(seasonIndex)
    for (let i = 0; i < seriesObject.seasons[seasonIndex].episodes.length; i++) {
        var onclick = function() {
            // set the description info
            SetEpisodeInfo(seriesObject, seasonIndex, i);
            selectedEpisode = i;
            localStorage.setItem("EPISODE_SELECTED_"+seriesObject.contentID, i);
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
    selectedSeason = parseInt(seasonIndex);
    var seriesObject = seriesObjects[localStorage.getItem("selectedContent")];
    SpawnSeriesEpisodes(seriesObject, seasonIndex)

    // save selected
    localStorage.setItem("SEASON_SELECTED_"+seriesObject.contentID, selectedSeason);
    
    // set the episodes to start index 0
    SetThumbRowObjectValues(thumbRowObjects[`thumbnailrow-episodes`], 0, 0);
    
    ResizeAllThumbnailDivs();
}






