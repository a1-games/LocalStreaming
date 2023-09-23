


async function SetCollectionInfo()
{
    var selectedItem = localStorage.getItem("selectedContent");
    var titlediv = document.getElementById("info-title");
    var thumb = document.getElementById("info-thumbnail");

    titlediv.innerText = selectedItem;
    thumb.style.backgroundImage = `url('Content/Collections/${selectedItem}/thumbnail.jpg')`;
    
    
    // load the collection's data
    LoadCollectionList(selectedItem);
}


async function LoadCollectionList(collectionName) {
    let scriptEle = document.createElement("script");
    scriptEle.id = collectionName;
    scriptEle.setAttribute("src", `Content/Collections/${collectionName}/CollectionInfo.js`);
    document.body.appendChild(scriptEle);
}




async function SpawnCollectionInfoFromData(collectionName, collectionList, description)
{
    var desc = document.getElementById("info-description");

    // use the collection's data
    desc.innerText = description;

    // spawn thumb row
    let parent = document.getElementById("collection-content")
    SpawnThumbnailRow(parent, "I", "Watch Order")

    // spawn thumbnails
    let thumbRow = document.getElementById(`thumbnailrow-${ContentID["I"]}`);
    for (let i = 0; i < collectionList.length; i++) {
        AddThumbnail(collectionList[i].title, ContentFolder[collectionList[i].contentType], thumbRow, ContentPageName[collectionList[i].contentType]);
    }

    
    ResizeAllThumbnailDivs();

    // remove the script again in case we need it another time
    document.getElementById(collectionName).remove();
}




























