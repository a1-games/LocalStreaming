




const contentbox = document.getElementById("main-content-box");

var currentPageName = "";




function LoadPage(pagename) {
    currentPageName = pagename;
    
    while (contentbox.firstChild) {
        contentbox.removeChild(contentbox.firstChild);
    }

    $("#main-content-box").load(`${pagename}.html`);
};










