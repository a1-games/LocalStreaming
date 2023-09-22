













function ResizeAllThumbnailDivs()
{
    var parentDiv = document.getElementById("main-content-box");
    var thumbnailRows = document.querySelectorAll(".thumbnail-div")

    for (let i = 0; i < thumbnailRows.length; i++) {
        ResizeThumbnailRow(thumbnailRows[i], parentDiv);
    }

}




async function ResizeThumbnailRow(thumbnailrow, parentcontainer)
{
    let thumbnailwidth = 256;
    let spacebetweenthumbnails = 12;
    let containerWidth = parentcontainer.offsetWidth;

    let rowWidth = 0;

    while (true)
    {
        rowWidth += thumbnailwidth;

        if (rowWidth + thumbnailwidth * 2 < containerWidth)
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






