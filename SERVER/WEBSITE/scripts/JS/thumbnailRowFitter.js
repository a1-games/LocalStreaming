var parentDiv = document.getElementById("main-content-box");


function MoveThumbnails(rowID, rightToLeft = true)
{
    if (!rightToLeft) // if left to right
    {
        // if we would go negative by subtracting anything ( no more thumbs to the left )
        if ( thumbRowObjects[rowID].firstindex - thumbnailsPerPage < 0 )
        {
            // if we have any thumbnails behind us, just go to index 0
            UnselectThumbnails(thumbRowObjects[rowID]);
            // setting values to 0
            SetThumbRowObjectValues(thumbRowObjects[rowID], 0, 0);

            RefreshSelectedThumbnails();
            return;
        }
    }
    else // if right to left
    {
        if (thumbRowObjects[rowID].firstindex + thumbnailsPerPage*2 > thumbRowObjects[rowID].thumbnails.length)
        {
            let excessThumbs = thumbRowObjects[rowID].thumbnails.length - (thumbRowObjects[rowID].firstindex + thumbnailsPerPage);
            
            // if there is nothing to the right, go all the way back
            if (excessThumbs <= 0)
            {
                // Go to index 0:
                UnselectThumbnails(thumbRowObjects[rowID]);
                // setting values to 0
                SetThumbRowObjectValues(thumbRowObjects[rowID], 0, 0);
    
                RefreshSelectedThumbnails();
                return;
            }
            // if there isnt a full page to the right but it isn't empty
            if (excessThumbs < thumbnailsPerPage && excessThumbs != 0)
            {
                // Go to index 0:
                UnselectThumbnails(thumbRowObjects[rowID]);
                // setting values to ecessthub
                let x = thumbRowObjects[rowID].xPos;
                x += rightToLeft ? (thumbnailwidth+spacebetweenthumbnails)*excessThumbs : -((thumbnailwidth+spacebetweenthumbnails)*excessThumbs);
                let fi = thumbRowObjects[rowID].firstindex;
                fi += rightToLeft ? excessThumbs : -excessThumbs;
                SetThumbRowObjectValues(thumbRowObjects[rowID], x, fi);
    
                RefreshSelectedThumbnails();
                return;
            }

        }
    }

    UnselectThumbnails(thumbRowObjects[rowID]);

    let x = thumbRowObjects[rowID].xPos;
    x += rightToLeft ? thumbnailRowWidth : -thumbnailRowWidth;
    let fi = thumbRowObjects[rowID].firstindex;
    fi += rightToLeft ? thumbnailsPerPage : -thumbnailsPerPage;
    
    SetThumbRowObjectValues(thumbRowObjects[rowID], x, fi);

    RefreshSelectedThumbnails();


}

function SetThumbRowObjectValues(TRO, xPos, firstindex)
{
    TRO.xPos = xPos;
    TRO.firstindex = firstindex;
    TRO.thumbRow.style.transform = `translateX(-${TRO.xPos}px)`;
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
    
    RefreshThumbnailSizePX()
    RefreshThumbRowPXsize(parentDiv.offsetWidth);
    
    for (let i = 0; i < thumbnailDivs.length; i++) {
        ResizeThumbnailDiv(thumbnailDivs[i]);
    }

    RefreshSelectedThumbnails();
}
function RefreshThumbnailSizePX()
{
    // get arbitrary thumbnail and get its size
    let tnsize = window.getComputedStyle(document.querySelectorAll(".content-thumbnail")[0]);

    thumbnailwidth = parseInt(tnsize.width.replace("px", ""));
    spacebetweenthumbnails = parseInt(tnsize.marginRight.replace("px", ""));
    combinedThumbnailWidth = thumbnailwidth + spacebetweenthumbnails;

}
function RefreshThumbRowPXsize(containerWidth)
{
    let rowWidth = 0;
    thumbnailsPerPage = 0;

    while (rowWidth + thumbnailwidth + 200 <= containerWidth)
    {
        rowWidth += thumbnailwidth;
        thumbnailsPerPage++;
        rowWidth += spacebetweenthumbnails;
        
    }

    thumbnailRowWidth = rowWidth;
}


async function ResizeThumbnailDiv(thumbnaildiv)
{
    thumbnaildiv.style.width = `${thumbnailRowWidth - spacebetweenthumbnails}px`;
    console.log(thumbnaildiv)
}





ResizeAllThumbnailDivs();

window.onresize = ResizeAllThumbnailDivs;






