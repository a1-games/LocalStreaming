


async function SpawnCollectionInfoFromData(collectionData)
{
    var titlediv = document.getElementById("info-title");
    var descElem = document.getElementById("info-description");

    titlediv.innerText = collectionData.title;

    let collectionDescription = "";
    for (let i = 0; i < collectionData.readableDescription.length; i++) {
        if (i != 0)
            collectionDescription += "\n";
        collectionDescription += collectionData.readableDescription[i];
    }
    
    // use the collection's data
    descElem.innerText = collectionDescription;

    // spawn thumb row
    let parent = document.getElementById("collection-content")
    SpawnThumbnailRow(parent, "I", "Watch Order")
    
    // spawn thumbnails
    let thumbRow = document.getElementById(`thumbnailrow-${ContentID["I"]}`);

    let collectionList = collectionData.watchOrder;
    for (let i = 0; i < collectionList.length; i++) {
        let onclick = function() {
            // set the selected content
            localStorage.setItem("selectedContent", collectionList[i].title);
            // load the page
            LoadPage(ContentPageName[collectionList[i].contentType]);
        };
        AddThumbnail(collectionList[i].title, `${ContentFolder[collectionList[i].contentType]}/${collectionList[i].title}/thumbnail.jpg`, thumbRow, onclick);
    }

    
    ResizeAllThumbnailDivs();

    // remove the script again in case we need it another time
    document.getElementById(collectionData.contentName).remove();
}




























