
let uploadButton = document.getElementById("upload-button");
let thumbnailUploader = document.getElementById("content-thumbnail");

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


function ClearInnerText(element) {
    element.innerText = "";
}

function ClearValue(element) {
    element.value = "";
}

function showUploadedThumb(event) {
    var image = document.getElementById("content-thumbnail");
    image.style.backgroundImage = `url(\"${URL.createObjectURL(event.target.files[0])}\")`;
    //console.log(`src(${URL.createObjectURL(event.target.files[0])})`)
};





async function UploadSelectedContentObject(contentType)
{
    WriteContentObjectOnServer(selectedContentObject, contentType)

    // upload thumnail if a file was given
    if (thumbnailUploader.files.length <= 0) return;

    let img = thumbnailUploader.files[0];
    let formData = new FormData();

    formData.append(`Content/${ContentFolder[contentType]}/${selectedContentObject.contentID}`, img);

    fetch(`http://${IP_ADDRESS}/addthumbnail`, {
        method: 'POST',
        body: formData,
    });

}



async function WriteContentObjectOnServer(obj, contentType)
{
    let data = {
        "ContentType" : contentType,
        "ContentID" : obj.contentID,
        "NewValue" : obj
    }

    //console.log("trying to create new user " + newUser.Username);

    // set user's new color scheme on server
    fetch(`http://${IP_ADDRESS}/editContent`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    });

    console.log("Wrote ContentObject to server:");
    console.log(obj);
}





let childRow = document.getElementById("child-rows");

function ClearEpisodeRow()
{
    while (childRow.firstChild) {
        childRow.removeChild(childRow.firstChild);
    }
}

let contentIDdiv = document.getElementById("series-id");
let contentTitleDiv = document.getElementById("series-title");
let contentDescDiv = document.getElementById("series-description");

function SpawnContentInfo(contentObject, contentType)
{
    ClearEpisodeRow();

    // save the reference
    selectedContentObject = contentObject;

    uploadButton.onclick = () => {
        UploadSelectedContentObject(contentType);
    }


    // content object stuff
    thumbnailUploader.style.backgroundImage = `url(\"Content/${ContentFolder[contentType]}/${contentObject.contentID}/thumbnail.jpg\")`;
    
    contentIDdiv.value = contentObject.contentID;
    contentIDdiv.onchange = () => {
        selectedContentObject.contentID = contentIDdiv.value;
    }

    contentTitleDiv.value = contentObject.contentTitle;
    contentTitleDiv.onchange = () => {
        selectedContentObject.contentTitle = contentTitleDiv.value;
    }

    contentDescDiv.value = GetSingleStringDescription(contentObject.readableDescription);
    contentDescDiv.onchange = () => {
        selectedContentObject.readableDescription = [contentDescDiv.value];
    }

}




function SpawnContentSelectionDropdown(dropdownElement, contentType)
{
    // clear options
    while (dropdownElement.firstChild) {
        dropdownElement.removeChild(dropdownElement.firstChild);
    }

    // add options
    let contentList = [];
  
    if (contentType == "S")
        contentList = Object.values(seriesObjects);
    else
        contentList = Object.values(movieObjects);

    for (let i = 0; i < contentList.length; i++) {
        let optionEl = document.createElement("option");
        optionEl.name = `${contentList[i].contentID}`;
        optionEl.value = `${contentList[i].contentID}`;
        optionEl.innerText = `${contentList[i].contentID}`;
        dropdownElement.append(optionEl);
    }
}

function SpawnContentTypeDropdown(parentElement)
{
    let DD = document.createElement("select");
    DD.classList.add("content-type-dropdown");

    let options = [ "S", "M", ];
    for (let i = 0; i < options.length; i++) {
        let optionEl = document.createElement("option");
        optionEl.name = options[i];
        optionEl.value = options[i];
        optionEl.innerText = `${ContentFolder[options[i]]}`;
        DD.append(optionEl);
    }

    parentElement.append(DD);
    return DD;
}





function SpawnAddRemoveButtons(onadd, onremove)
{
    let addRemover = document.createElement("div");
    addRemover.classList.add("addremove-row");
    addRemover.id = (`addremove-collection`);
    
    let remover = document.createElement("div");
    remover.classList.add("addremove")
    remover.classList.add("add-episode")
    remover.innerText = "-";
    remover.onclick = () => {
        onremove();
    };
    addRemover.append(remover);
    
    let adder = document.createElement("div");
    adder.classList.add("addremove")
    adder.classList.add("add-episode")
    adder.innerText = "+";
    adder.onclick = () => {
        onadd();
    };
    addRemover.append(adder);

    childRow.append(addRemover);
}






























