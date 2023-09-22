




async function ResizeThumbnailRow(thumbnailrow, parentcontainer)
{
    let thumbnailwidth = 256;
    let spacebetweenthumbnails = 12;
    let containerWidth = parentcontainer.style.width;

    let rowWidth = 0;

    while (true)
    {
        rowWidth += thumbnailwidth;

        if (rowWidth + spacebetweenthumbnails < containerWidth)
        {
            rowWidth += spacebetweenthumbnails;
        }
        else
        {
            break;
        }
    }

    console.log(thumbnailrow)

    thumbnailrow.style.width = rowWidth;
}














