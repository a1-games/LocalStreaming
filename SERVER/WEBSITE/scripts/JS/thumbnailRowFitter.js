var parentDiv = document.getElementById("main-content-box");














function MoveThumbnailsRightToLeft(rowID)
{
    var thumbnailRow = document.getElementById(rowID);
    var thumbnails = thumbnailRow.querySelectorAll(".content-thumbnail");

    // get the first index of the currently showcased items
    let firstindex = 0;
    for (let i = 0; i < thumbnails.length; i++) {
        if (thumbnails[i].classList.contains("thumbnail-active"))
        {
            firstindex = i;
            break;
        }
    }

    // get the last index of the currently showcased items
    let lastindex = 0;
    for (let i = firstindex; i < thumbnails.length; i++) {
        if (thumbnails[i].classList.contains("thumbnail-inactive"))
        {
            lastindex = i;
            break;
        }
        else // remove active status if not
        {
            thumbnails[i].classList.remove("thumbnail-active");
            thumbnails[i].classList.add("thumbnail-inactive");
        }
    }


     // set the new couple elements as selected
    for (let i = lastindex; i < thumbnails.length; i++) {
        thumbnails[i].classList.remove("thumbnail-inactive");
        thumbnails[i].classList.add("thumbnail-active");
        if (i >= lastindex + thumbnailsPerPage-1)
        {
            break;
        }
    }

    let pageNr = 1 + firstindex / thumbnailsPerPage;

    thumbnailRow.style.transform = `translateX(-${GetThumbRowPXsize(parentDiv.offsetWidth)*pageNr}px)`;

}






async function AddThumbnailScrollBehaviour()
{
    var thumbnailRows = document.querySelectorAll(".thumbnail-row")

    thumbnailRows.forEach ( (thumbnailRow, i) => {
        var thumbnails = thumbnailRow.querySelectorAll(".content-thumbnail");

        for (let i = 0; i < thumbnails.length; i++) {
            if (i < thumbnailsPerPage)
            {
                thumbnails[i].classList.add("thumbnail-active");
            }
            else
            {
                thumbnails[i].classList.add("thumbnail-inactive");
            }
        }



    });
    
}



















// resizing rows on window change to fit max amount of thumbnails

function ResizeAllThumbnailDivs()
{
    var thumbnailDivs = document.querySelectorAll(".thumbnail-div")

    for (let i = 0; i < thumbnailDivs.length; i++) {
        ResizeThumbnailRow(thumbnailDivs[i], parentDiv);
    }

}

function GetThumbRowPXsize(containerWidth)
{
    let thumbnailwidth = 256;
    let spacebetweenthumbnails = 12;

    let rowWidth = 0;
    thumbnailsPerPage = 0;

    while (true)
    {
        rowWidth += thumbnailwidth;
        thumbnailsPerPage++;
        rowWidth += spacebetweenthumbnails;

        if (rowWidth + thumbnailwidth + 200 < containerWidth)
        {
        }
        else
        {
            break;
        }
    }

    return rowWidth;
}


async function ResizeThumbnailRow(thumbnailrow, parentcontainer)
{
    let thumbnailwidth = 256;
    let spacebetweenthumbnails = 12;
    let containerWidth = parentcontainer.offsetWidth;

    let rowWidth = 0;
    thumbnailsPerPage = 0;

    while (true)
    {
        rowWidth += thumbnailwidth;
        thumbnailsPerPage++;

        if (rowWidth + thumbnailwidth + 200 < containerWidth)
        {
            rowWidth += spacebetweenthumbnails;
        }
        else
        {
            break;
        }
    }

    thumbnailrow.style.width = `${rowWidth}px`;
    
}





ResizeAllThumbnailDivs();

window.onresize = ResizeAllThumbnailDivs;






