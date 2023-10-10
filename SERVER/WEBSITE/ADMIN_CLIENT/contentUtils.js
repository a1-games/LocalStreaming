
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





async function UploadSelectedContentObject()
{
    console.log(selectedContentObject);
}






let childRow = document.getElementById("child-rows");

function ClearEpisodeRow()
{
    while (childRow.firstChild) {
        childRow.removeChild(childRow.firstChild);
    }
}

let contentThumbDiv = document.getElementById("series-thumbnail");
let contentIDdiv = document.getElementById("series-id");
let contentTitleDiv = document.getElementById("series-title");
let contentDescDiv = document.getElementById("series-description");

function SpawnContentInfo(contentObject, contentType)
{
    ClearEpisodeRow();

    // save the reference
    selectedContentObject = contentObject;


    // content object stuff
    contentThumbDiv.style.backgroundImage = `url(\"Content/${ContentFolder[contentType]}/${contentObject.contentID}/thumbnail.jpg\")`;
    contentIDdiv.value = contentObject.contentID;
    contentTitleDiv.innerText = contentObject.contentTitle;
    contentDescDiv.value = GetSingleStringDescription(contentObject.readableDescription);

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






























