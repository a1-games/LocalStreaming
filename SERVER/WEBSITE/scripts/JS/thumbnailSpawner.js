

function GetKeyListFromContent(contentObjectDictionary, randomize = true)
{
    // get the keys
    _contentKeys = [...Object.keys(contentObjectDictionary)];
    if (!randomize)
    {
        return _contentKeys;
    }
    // if randomize is true:
    rndKeys = [];
    let len = _contentKeys.length;
    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _contentKeys.length);
        rndKeys[i] = (_contentKeys[rnd]);
        _contentKeys.splice(rnd, 1);
    }
    return rndKeys;
}



function SpawnThumbnailRow(appendParent, contentType, title, contentList = null, randomize = true)
{

    // parent row div
    let parent = document.createElement("div");
    parent.classList.add("row");
    parent.id = ContentID[contentType];
    
    // arrows
    let arrow_r = document.createElement("div");
    arrow_r.classList.add("arrow");
    arrow_r.classList.add("arrow-right");
    arrow_r.innerText = ">";
    arrow_r.onclick = () => { MoveThumbnails(`thumbnailrow-${ContentID[contentType]}`, true); }
    
    let arrow_l = document.createElement("div");
    arrow_l.classList.add("arrow");
    arrow_l.classList.add("arrow-left");
    arrow_l.innerText = "<";
    arrow_l.onclick = () => { MoveThumbnails(`thumbnailrow-${ContentID[contentType]}`, false); }

    // thumbnail row parent
    let section = document.createElement("div");
    section.classList.add("thumbnail-section");

    // title div
    let titlediv = document.createElement("div");
    titlediv.classList.add("section-title");
    titlediv.id = `title-${ContentID[contentType]}`;
    titlediv.innerHTML = title;
    
    // thumb fixed size
    let thumbDiv = document.createElement("div");
    thumbDiv.classList.add("thumbnail-div");
    
    // thumb auto size
    let thumbRow = document.createElement("div");
    thumbRow.classList.add("thumbnail-row");
    thumbRow.id = `thumbnailrow-${ContentID[contentType]}`;
    
    // set the hierarchy
    section.append(titlediv);
    thumbDiv.append(thumbRow);
    section.append(thumbDiv)
    
    thumbDiv.append(arrow_l);
    thumbDiv.append(arrow_r);

    parent.append(section);

    appendParent.append(parent);

    thumbRowObjects[`thumbnailrow-${ContentID[contentType]}`] = {
        "thumbnails" : [],
        "thumbRow" : thumbRow,
        "xPos" : 0,
        "firstindex" : 0,
        "arrow_l" : arrow_l,
        "arrow_r" : arrow_r,
    };
    
    // spawn the thumbnails
    if (contentList != null)
    {
        LoadAllThumbnails(contentList, contentType, thumbRow, randomize = true);
    }

}

function LoadAllThumbnails(objectList, contentType, thumbRow, randomize = true)
{
    let keys = GetKeyListFromContent(objectList, randomize);

    for (let i = 0; i < keys.length; i++) {
        var onclick = function() {
            // set the selected content
            SelectContentObject(objectList[keys[i]], contentType);
            // load the page
            LoadPage(ContentPageName[contentType]);
        };

        AddThumbnail(keys[i], `${ContentFolder[contentType]}/${keys[i]}/thumbnail.jpg`, thumbRow, onclick);
    }
}



function AddThumbnail(contentID, contentURL, parent, onclick, thumbnailText = null)
{
    var clickableElement = document.createElement("a");
    clickableElement.id = contentID;
    clickableElement.classList.add("content-thumbnail");
    clickableElement.classList.add("thumbnail-inactive");
    
    clickableElement.onclick = () => onclick();


    thumbRowObjects[parent.id].thumbnails.push(clickableElement);

    clickableElement.style.backgroundImage = `url('Content/${contentURL}`;

    if (thumbnailText != null)
    {
        let textEl = document.createElement("div");
        textEl.classList.add("thumbnail-text");
        textEl.innerText = thumbnailText;
        clickableElement.append(textEl);
    }

    // watch progress to 0
    let progress = document.createElement("div");
    progress.classList.add("thumbnail-wp");
    progress.id = `progress_${contentID}`;

    clickableElement.append(progress);

    parent.append(clickableElement);
}


async function LoadWatchProgressForContentType(contentType)
{
    //console.log(`thumbnailrow-${ContentID[contentType]}`)
    let thumbWPs = document.getElementById(`thumbnailrow-${ContentID[contentType]}`).querySelectorAll(".thumbnail-wp");
    
    for (let i = 0; i < thumbWPs.length; i++) {
        let thumbEl = thumbWPs[i];
        let wpID = thumbEl.id;
        wpID = wpID.replace("progress_", "");
        let prog = GetWatchProgress(wpID, contentType);
        if (contentType == "E")
            prog = GetEpisodeWatchProgress(selectedSeason, i);

        // only do the next stuff if we actually have a saved progress for this
        if (isNaN(prog)) continue;
        //console.log(thumbWPs[i])
        thumbEl.style.width = `${prog * 100}%`;
    }


}















