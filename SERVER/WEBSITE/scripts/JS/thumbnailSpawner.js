

function GetRandomKeyListFromContent(contentObjectDictionary)
{
    rndKeys = [];
    _contentKeys = [...Object.keys(contentObjectDictionary)];
    let len = Object.keys(_contentKeys).length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _contentKeys.length);
        rndKeys[i] = (_contentKeys[rnd]);
        _contentKeys.splice(rnd, 1);
    }

    return rndKeys;
}


async function LoadAllThumbnails(objectList, contentType, thumbRow)
{
    let randomKeys = GetRandomKeyListFromContent(objectList);

    for (let i = 0; i < randomKeys.length; i++) {
        var onclick = function() {
            // set the selected content
            SelectContentObject(objectList[randomKeys[i]], contentType);
            // load the page
            LoadPage(ContentPageName[contentType]);


        };
        AddThumbnail(randomKeys[i], `${ContentFolder[contentType]}/${randomKeys[i]}/thumbnail.jpg`, thumbRow, onclick);
    }
}



async function SpawnThumbnailRow(appendParent, contentType, title, contentList = null)
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
        LoadAllThumbnails(contentList, contentType, thumbRow);
    }

}


async function AddThumbnail(contentName, contentURL, parent, onclick, thumbnailText = null)
{
    var clickableElement = document.createElement("a");
    clickableElement.id = contentName;
    clickableElement.classList.add("content-thumbnail");
    clickableElement.classList.add("thumbnail-inactive");
    clickableElement.href = "#"; // should be to play the video
    
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

    parent.append(clickableElement);
}


















