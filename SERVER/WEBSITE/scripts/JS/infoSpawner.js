


function GetSingleStringDescription(readableDescription)
{
    let ssDescription = "";
    for (let i = 0; i < readableDescription.length; i++) {
        if (i != 0)
        ssDescription += "\n";
        ssDescription += readableDescription[i];
    }
    return ssDescription;
}


async function SpawnContentInfo(contentObject, contentType)
{
    var titlediv = document.getElementById("info-title");
    var descElem = document.getElementById("info-description");
    var thumb = document.getElementById("info-thumbnail");
    
    thumb.style.backgroundImage = `url('Content/${ContentFolder[contentType]}/${contentObject.contentID}/thumbnail.jpg')`;
    titlediv.innerText = contentObject.contentTitle;

    descElem.innerText = GetSingleStringDescription(contentObject.readableDescription);

    // movies only need the info
    if (contentType == "M") return;

    if (contentType == "S")
    {
        // spawn thumb row
        //let parent = document.getElementById("episodes")
        //SpawnThumbnailRow(parent, "S", "Season 1")
            
        thumbRowObjects[`thumbnailrow-episodes`] = {
            "thumbnails" : [],
            "thumbRow" : document.getElementById(`thumbnailrow-episodes`),
            "xPos" : 0,
            "firstindex" : 0,
            "arrow_l" : document.getElementById(`arrow-l-episodes`),
            "arrow_r" : document.getElementById(`arrow-r-episodes`),
        };
 
        // spawn season one, let user change it themselves
        SpawnSeriesEpisodes(contentObject, selectedSeason);

        // set the episode info to episode 1
        // this should be the last watched episode or that +1 if it was finished
        SetEpisodeInfo(contentObject, selectedSeason, selectedEpisode);

        // season choser dropdown
        let seasonDropdown = document.getElementById("season-dropdown");
        for (let i = 0; i < contentObject.seasons.length; i++) {
                
            let option = document.createElement("option");
            option.value = i;
            option.className = "season-option";
            option.innerText = `Season ${i+1}`;
            
            seasonDropdown.append(option);
        }
        seasonDropdown.value = selectedSeason;

    }
    

    if (contentType == "C")
    {
        // spawn thumb row
        let parent = document.getElementById("collection-content")
        SpawnThumbnailRow(parent, "I", "Watch Order")

        // has to happen after spawnThumbnails
        let thumbRow = document.getElementById(`thumbnailrow-${ContentID["I"]}`);
        
        // spawn thumbnails
        let collectionList = contentObject.watchOrder;
        for (let i = 0; i < collectionList.length; i++) {
            let CT = collectionList[i].contentType;
            let onclick = function() {
                // set the selected content
                if (CT == "M")
                    SelectContentObject(movieObjects[collectionList[i].title], CT);
                if (CT == "S")
                    SelectContentObject(seriesObjects[collectionList[i].title], CT);
                // load the page
                LoadPage(ContentPageName[collectionList[i].contentType]);
            };
            AddThumbnail(collectionList[i].title, `${ContentFolder[collectionList[i].contentType]}/${collectionList[i].title}/thumbnail.jpg`, thumbRow, onclick);
        }
    }

    // resize thumb divs just because
    ResizeAllThumbnailDivs();

}







