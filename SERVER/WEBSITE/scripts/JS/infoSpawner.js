


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
    await LoadCollectionThumbnails(collectionList);

    // remove the script again in case we need it another time
    document.getElementById(collectionName).remove();
}



async function LoadCollectionThumbnails(contentList)
{
    var thumbnailrow = document.getElementById("thumbnailrow-watchorder");

    for (let i = 0; i < contentList.length; i++) {
        let pagename = ContentPageName[contentList[i].contentType];
        // from thumbnailSpawner:
        AddThumbnail(contentList[i].title, ContentFolder[contentList[i].contentType], thumbnailrow, pagename);
    }
}




























