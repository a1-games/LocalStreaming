var parentDiv = document.getElementById("main-content-box");


function MoveThumbnails(rowID, right = true)
{
    let thumbnailRow = thumbRowObjects[rowID].thumbRow;

    UnselectThumbnails(thumbRowObjects[rowID]);

    thumbRowObjects[rowID].xPos += right ? thumbnailRowWidth : -thumbnailRowWidth;
    thumbRowObjects[rowID].firstindex += right ? thumbnailsPerPage : -thumbnailsPerPage;
    thumbnailRow.style.transform = `translateX(-${thumbRowObjects[rowID].xPos}px)`;

    RefreshSelectedThumbnails();
}

function UnselectThumbnails(thumbRowObject)
{
    let thumbnails = thumbRowObject.thumbnails;
    let firstindex = thumbRowObject.firstindex;

    // set the inactive again
    for (let i = firstindex; i < thumbnails.length; i++) {
        thumbnails[i].classList.remove("thumbnail-active");
        thumbnails[i].classList.add("thumbnail-inactive");
        if (i >= firstindex + thumbnailsPerPage-1)
        {
            break;
        }
    }
}

async function RefreshSelectedThumbnails()
{
    Object.values(thumbRowObjects).forEach ( (thumbnailRowObject, x) => {
        var thumbnails = thumbnailRowObject.thumbnails;
        // get the first index of the currently showcased items
        let firstindex = thumbnailRowObject.firstindex;

        for (let i = firstindex; i < thumbnails.length; i++) {
            thumbnails[i].classList.remove("thumbnail-inactive");
            thumbnails[i].classList.add("thumbnail-active");
            if (i >= firstindex + thumbnailsPerPage-1)
            {
                break;
            }
        }
    });
    
}




// resizing rows on window change to fit max amount of thumbnails

function ResizeAllThumbnailDivs()
{
    var thumbnailDivs = document.querySelectorAll(".thumbnail-div")
    
    // unselect all
    Object.values(thumbRowObjects).forEach ( (thumbnailRowObject, x) => {
        UnselectThumbnails(thumbnailRowObject);
    });

    RefreshThumbRowPXsize(parentDiv.offsetWidth);

    for (let i = 0; i < thumbnailDivs.length; i++) {
        ResizeThumbnailRow(thumbnailDivs[i]);
    }

    RefreshSelectedThumbnails();
}

function RefreshThumbRowPXsize(containerWidth)
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

        if (rowWidth + thumbnailwidth + 200 >= containerWidth)
        {
            break;
        }
    }

    thumbnailRowWidth = rowWidth;
}


async function ResizeThumbnailRow(thumbnailrow)
{
    let spacebetweenthumbnails = 12;

    thumbnailrow.style.width = `${thumbnailRowWidth - spacebetweenthumbnails}px`;
}





ResizeAllThumbnailDivs();

window.onresize = ResizeAllThumbnailDivs;






