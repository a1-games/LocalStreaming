

const selectedItem = localStorage.getItem("selectedContent");


async function SetCollectionInfo()
{
    var titlediv = document.getElementById("info-title");
    var thumb = document.getElementById("info-thumbnail");

    titlediv.innerText = selectedItem;
    thumb.style.backgroundImage = `url('Content/Collections/${selectedItem}/thumbnail.jpg')`;
    
    
    // load the collection's data
    LoadCollectionList(selectedItem);
}

async function SpawnCollectionInfoFromData(collectionList, description)
{
    var desc = document.getElementById("collection-description");
    // use the collection's data
    desc.innerText = description;
    LoadCollectionThumbnails(collectionList);
}



async function LoadCollectionThumbnails(contentList)
{
    var thumbnailrow = document.getElementById("thumbnailrow");

    for (let i = 0; i < contentList.length; i++) {
        AddThumbnailToCollectionList(contentList[i].title, ContentFolder[contentList[i].contentType], thumbnailrow);
    }
}

async function AddThumbnailToCollectionList(contentName, contentFolder, parent)
{
    var clickableElement = document.createElement("a");
    clickableElement.id = contentName;
    clickableElement.className = "content-thumbnail";
    clickableElement.href = "#"; // should play the video

    clickableElement.onclick = function() { /* start playing the video */ };

    clickableElement.style.backgroundImage = `url('Content/${contentFolder}/${contentName}/thumbnail.jpg')`;

    parent.append(clickableElement);
}






async function LoadCollectionList(collectionName) {
    let scriptEle = document.createElement("script");
    scriptEle.setAttribute("src", `Content/Collections/${collectionName}/CollectionInfo.js`);
    document.body.appendChild(scriptEle);
}




























