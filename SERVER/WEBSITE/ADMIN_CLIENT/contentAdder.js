

let currentSeriesObject = {};


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


function showUploadedThumb(event) {
    var image = document.getElementById("content-thumbnail");
    image.style.backgroundImage = `url(\"${URL.createObjectURL(event.target.files[0])}\")`;
    console.log(`src(${URL.createObjectURL(event.target.files[0])})`)
};


function ClearInnerText(element) {
    element.innerText = "";
}

function ClearValue(element) {
    element.value = "";
}



async function ListAllSeries()
{

}


async function UploadSeriesObject()
{
    console.log(currentSeriesObject);
}


// --- When a series has been selected: ---

let episodeRow = document.getElementById("series-episodes");
let seriesThumbDiv = document.getElementById("series-thumbnail");
let seriesIDdiv = document.getElementById("series-id");
let seriesTitleDiv = document.getElementById("series-title");
let seriesDescDiv = document.getElementById("series-description");

function ClearEpisodeRow()
{
    while (episodeRow.firstChild) {
        episodeRow.removeChild(episodeRow.firstChild);
    }
}

function SpawnSeriesInfo(seriesObject)
{
    // save the reference
    currentSeriesObject = seriesObject;


    // content object stuff
    seriesThumbDiv.style.backgroundImage = `url(\"Content/Series/${seriesObject.contentID}/thumbnail.jpg\")`;
    seriesIDdiv.value = seriesObject.contentID;
    seriesTitleDiv.innerText = seriesObject.contentTitle;
    seriesDescDiv.value = GetSingleStringDescription(seriesObject.readableDescription);

    // episodes list
    let seasons = seriesObject.seasons;
    for (let i = 0; i < seasons.length; i++) {
        let seperatorTitle = document.createElement("div");
        seperatorTitle.classList.add("episode-info-row");
        seperatorTitle.innerText = `Season ${i+1}`;

        episodeRow.append(seperatorTitle);

        let episodes = seasons[i].episodes;
        for (let j = 0; j < episodes.length; j++) {
            let eObj = episodes[j];
            // get the S & E numbers so they dont change and give errors
            let S = i;
            let E = j;

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
            epIDdiv.innerText = `S${i+1}E${j+1}`;
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
                currentSeriesObject.seasons[S].episodes[E].fileType = fileTypeDiv.value;
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
                currentSeriesObject.seasons[S].episodes[E].title = titlediv.value;
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
                currentSeriesObject.seasons[S].episodes[E].intro.start = introStartDiv.value;
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
                currentSeriesObject.seasons[S].episodes[E].intro.end = introEndDiv.value;
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
                currentSeriesObject.seasons[S].episodes[E].description = descDiv.value;
            };
            row.append(descDiv);


            episodeRow.append(row);
        }
    }
}






// -------- Start --------

ClearEpisodeRow();


SpawnSeriesInfo(seriesObjects["Game_Of_Thrones"])












