
let seriesThumbRow = document.getElementById("series-thumbrow");
let movieThumbRow = document.getElementById("movies-thumbrow");
let collectionThumbRow = document.getElementById("collections-thumbrow");

let selectedContentObject = {};



async function SpawnSeriesThumbs()
{
    ClearEpisodeRow();

    let keys = [...Object.keys(seriesObjects)];
    await SpawnThumbnailRow(seriesThumbRow, "S", "Series");

    let thumbRow = document.getElementById("thumbnailrow-series");

    for (let i = 0; i < keys.length; i++) {
        var onclick = function() {
            SpawnSeriesInfo(seriesObjects[keys[i]]);
        };
        AddThumbnail(keys[i], `Series/${keys[i]}/thumbnail.jpg`, thumbRow, onclick);
    }
    
    ResizeAllThumbnailDivs();
}



async function SpawnMovieThumbs()
{
    ClearEpisodeRow();

    let keys = [...Object.keys(movieObjects)];
    await SpawnThumbnailRow(movieThumbRow, "M", "Movies");

    let thumbRow = document.getElementById("thumbnailrow-movies");

    for (let i = 0; i < keys.length; i++) {
        var onclick = function() {
            SpawnContentInfo(movieObjects[keys[i]], "M");
        };
        AddThumbnail(keys[i], `Movies/${keys[i]}/thumbnail.jpg`, thumbRow, onclick);
    }
    
    ResizeAllThumbnailDivs();
}


async function SpawnCollectionThumbs()
{
    ClearEpisodeRow();

    let keys = [...Object.keys(collectionObjects)];
    await SpawnThumbnailRow(collectionThumbRow, "C", "Collections");

    let thumbRow = document.getElementById("thumbnailrow-collections");

    for (let i = 0; i < keys.length; i++) {
        var onclick = function() {
            SpawnCollectionInfo(collectionObjects[keys[i]])
        };
        AddThumbnail(keys[i], `Collections/${keys[i]}/thumbnail.jpg`, thumbRow, onclick);
    }
    
    ResizeAllThumbnailDivs();
}





// -- when collection is selected --
function SpawnCollectionItem(index, watchItem)
{
    let row = document.createElement("div");
    row.classList.add("episode-info-row");

    // watch order number
    let orderNrDiv =  document.createElement("div");
    orderNrDiv.classList.add("order-number");
    orderNrDiv.innerText = `${index+1}:`;
    row.append(orderNrDiv);

    // type dropdown
    let typeDropdown = SpawnContentTypeDropdown(row);
    typeDropdown.value = watchItem.contentType;
    
    // content choices dropdown
    let choiceDropdown = document.createElement("select");
    choiceDropdown.classList.add("content-type-dropdown");
    
    // changing the movie/series options
    typeDropdown.onchange = () => {
        SpawnContentSelectionDropdown(choiceDropdown, typeDropdown.value)
        // set new value internally
        selectedContentObject.watchOrder[index].contentType = typeDropdown.value;
        // also set choice value to avoid errors of type mismatch
        if (typeDropdown.value == "S")
            choiceDropdown.value = "Loki";
        else
            choiceDropdown.value = "Avatar_1";
    }
    SpawnContentSelectionDropdown(choiceDropdown, watchItem.contentType);
    
    choiceDropdown.onchange = () => {
        console.log(selectedContentObject.watchOrder[index]);
        // set new value internally
        selectedContentObject.watchOrder[index].title = choiceDropdown.value;
    }
    
    choiceDropdown.value = watchItem.title;
    row.append(choiceDropdown);

    // append the whole row
    childRow.append(row);
}

function SpawnCollectionInfo(collectionObject)
{
    SpawnContentInfo(collectionObject, "C");
    
    //console.log(collectionObject)

    // episodes list
    let watchOrder = collectionObject.watchOrder;
    
    for (let i = 0; i < watchOrder.length; i++) {
        SpawnCollectionItem(i, watchOrder[i]);
    }
    


    let onremove = () => {
        // remove the thing
        selectedContentObject.watchOrder.splice(selectedContentObject.watchOrder.length-1, 1);
        // refresh the list
        SpawnCollectionInfo(selectedContentObject, "C");
    };  

    let onadd = () => {
        // get added episode's index
        let eIndex = selectedContentObject.watchOrder.length;
        // add empty eObj to contentObject
        let eObj = {
          title:"Avatar_1",
          contentType:"M",  
        };
        selectedContentObject.watchOrder.push(eObj)
        SpawnCollectionItem(eIndex, eObj);
    };

    SpawnAddRemoveButtons(onadd, onremove);

}


// --- When a series has been selected: ---


function SpawnSeriesInfo(seriesObject)
{
    SpawnContentInfo(seriesObject, "S");


    // episodes list
    let seasons = seriesObject.seasons;
    for (let i = 0; i < seasons.length; i++) {
        let seperatorTitle = document.createElement("div");
        seperatorTitle.classList.add("episode-info-row");
        seperatorTitle.innerText = `Season ${i+1}`;

        childRow.append(seperatorTitle);

        let episodes = seasons[i].episodes;
        for (let j = 0; j < episodes.length; j++) {
            let eObj = episodes[j];
            // get the S & E numbers so they dont change and give errors
            let S = i;
            let E = j;

            AddEpisodeRow(eObj, S, E);
        }

        // at the very end, add episode remove/add for the season

        let onremove = () => {
            
        };

        let onadd = () => {
            // get added episode's index
            let eIndex = contentObject.seasons.episodes.length-1;
            // add empty eObj to contentObject
            let eObj = somethingSomething, title = something, desc, intro, etc
            selectedContentObject.seasons[eIndex] = eObj;
            // add data
            // add episode row visually with the eObj
            AddEpisodeRow(eObj, i, eIndex);
        };

        SpawnAddRemoveButtons(onadd, onremove);

    }
}

function AddEpisodeRow(eObj, S, E)
{
    // add intro object if we havent added already
    if (!("intro" in eObj))
    {
        eObj["intro"] = {start:0,end:0};
    }

    let row = document.createElement("div");
    row.classList.add("episode-info-row");

    // S[X]E[X] episode id
    let epIDdiv =  document.createElement("div");
    epIDdiv.classList.add("episode-number");
    epIDdiv.innerText = `S${S+1}E${E+1}`;
    row.append(epIDdiv);

    // file type dropdown
    let fileTypeDiv =  document.createElement("select");
    fileTypeDiv.classList.add("episode-fileformat");
    fileTypeDiv.value = "mkv";
    fileTypeDiv.name = "episode-fileformat";
    // adding the options. this is bad for performance but fuck it its an admin page
    let options = [ "mkv", "mp4", "mov", ];
    for (let l = 0; l < options.length; l++) {
        let optionEl = document.createElement("option");
        optionEl.name = options[l];
        optionEl.value = options[l];
        optionEl.innerText = `.${options[l]}`;
        fileTypeDiv.append(optionEl);
    }
    // add onchange
    fileTypeDiv.onchange = () => {
        selectedContentObject.seasons[S].episodes[E].fileType = fileTypeDiv.value;
    };
    row.append(fileTypeDiv);

    // title
    let titlediv =  document.createElement("input");
    titlediv.classList.add("episode-info-text");
    titlediv.classList.add("episode-title");
    titlediv.value = eObj.title;
    titlediv.type = "text";
    titlediv.onfocus = () => ClearValue(titlediv);
    // add onchange
    titlediv.onchange = () => {
        selectedContentObject.seasons[S].episodes[E].title = titlediv.value;
    };
    row.append(titlediv);

    // intro start
    let introStartDiv =  document.createElement("input");
    introStartDiv.classList.add("episode-intronr");
    introStartDiv.classList.add("episode-introstart");
    introStartDiv.value = eObj.intro.start;
    introStartDiv.type = "text";
    // add onchange
    introStartDiv.onchange = () => {
        selectedContentObject.seasons[S].episodes[E].intro.start = introStartDiv.value;
    };
    row.append(introStartDiv);

    // intro end
    let introEndDiv =  document.createElement("input");
    introEndDiv.classList.add("episode-intronr");
    introEndDiv.classList.add("episode-introend");
    introEndDiv.value = eObj.intro.end;
    introEndDiv.type = "text";
    // add onchange
    introEndDiv.onchange = () => {
        selectedContentObject.seasons[S].episodes[E].intro.end = introEndDiv.value;
    };
    row.append(introEndDiv);

    // Description
    let descDiv =  document.createElement("textarea");
    descDiv.classList.add("episode-description");
    descDiv.wrap = "soft";
    descDiv.innerText = eObj.description;
    descDiv.onfocus = () => ClearInnerText(titlediv);
    // add onchange
    descDiv.onchange = () => {
        selectedContentObject.seasons[S].episodes[E].description = descDiv.value;
    };
    row.append(descDiv);


    childRow.append(row);
}











