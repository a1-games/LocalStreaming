

function RandomizeSeriesList()
{
    rndSeries = [];
    _series = [...series]
    let len = _series.length > 20 ? 20 : _series.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _series.length);
        rndSeries[i] = (_series[rnd]);
        _series.splice(rnd, 1);
    }
}
function RandomizeMoviesList()
{
    rndMovies = [];
    _movies = [...movies]
    let len = _movies.length > 20 ? 20 : _movies.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _movies.length);
        rndMovies[i] = (_movies[rnd]);
        _movies.splice(rnd, 1);
    }
}
function RandomizeCollectionsList()
{
    rndCollections = [];
    _collections = [...collections]
    let len = _collections.length;

    for (let i = 0; i < len; i++) {
        let rnd = Math.floor(Math.random() * _collections.length);
        rndCollections[i] = (_collections[rnd]);
        _collections.splice(rnd, 1);
    }
}



async function LoadAllThumbnails(thumblist, contentType, thumbRow)
{
    for (let i = 0; i < thumblist.length; i++) {
        AddThumbnail(thumblist[i], ContentFolder[contentType], thumbRow, ContentPageName[contentType]);
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
    arrow_r.innerText = "Go Right";
    arrow_r.onclick = () => { MoveThumbnails(`thumbnailrow-${ContentID[contentType]}`, true); }
    
    let arrow_l = document.createElement("div");
    arrow_l.classList.add("arrow");
    arrow_l.classList.add("arrow-left");
    arrow_l.innerText = "Go Back";
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

    parent.append(arrow_l);
    parent.append(arrow_r);
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
        console.log("jjjjjjjjjjjjjjjjjjjj")
        LoadAllThumbnails(contentList, contentType, thumbRow);
    }

    console.log(parent);
}


async function AddThumbnail(contentName, contentFolder, parent, pageToLoad)
{
    var clickableElement = document.createElement("a");
    clickableElement.id = contentName;
    clickableElement.classList.add("content-thumbnail");
    clickableElement.classList.add("thumbnail-inactive");
    clickableElement.href = "#"; // should be to play the video
    
    clickableElement.onclick = function() {
        // set the selected content
        localStorage.setItem("selectedContent", contentName);
        // load the page
        LoadPage(pageToLoad);
    };

    thumbRowObjects[parent.id].thumbnails.push(clickableElement);

    clickableElement.style.backgroundImage = `url('Content/${contentFolder}/${contentName}/thumbnail.jpg')`;

    parent.append(clickableElement);
}


















