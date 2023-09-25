
async function SetContentInfo(contentType)
{
    var selectedItem = localStorage.getItem("selectedContent");
    var titlediv = document.getElementById("info-title");
    var thumb = document.getElementById("info-thumbnail");

    titlediv.innerText = selectedItem;
    thumb.style.backgroundImage = `url('Content/${ContentFolder[contentType]}/${selectedItem}/thumbnail.jpg')`;
    
    // load the collection's data
    LoadContentData(contentType, selectedItem);
}


async function LoadContentData(contentType, contentName) {
    let scriptEle = document.createElement("script");
    scriptEle.id = contentName;
    scriptEle.setAttribute("src", `Content/${ContentFolder[contentType]}/${contentName}/Info.js`);
    document.body.appendChild(scriptEle);
}













