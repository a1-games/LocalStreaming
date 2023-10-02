

var seriesThumbElems = [];
var moviesThumbElems = [];
var collectionsThumbElems = [];

var currentContentObject = {};

function SelectContentObject(obj, contentType)
{
    currentContentObject = obj;
    currentContentObject.contentType = contentType;
    localStorage.setItem("selectedContent", currentContentObject.contentID);
}

ContentID = {
    //key : foldername
    S:"series",
    M:"movies",
    C:"collections",
    I:"collectioninfo",
};


ContentFolder = {
    //key : foldername
    S:"Series",
    M:"Movies",
    C:"Collections",
};    


ContentPageName = {
    //key : foldername
    S:"page_series",
    M:"page_movie",
    C:"page_collection",
};


var combinedThumbnailWidth = 256;
var thumbnailwidth = 256;
var spacebetweenthumbnails = 12;
var arrowSize = 56;

var thumbnailsPerPage = 6;
var thumbnailRowWidth = 1000;
var thumbRowObjects = {};

var selectedSeason = 0;
var selectedEpisode = 0;



