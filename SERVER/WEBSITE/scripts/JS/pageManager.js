




const contentbox = document.getElementById("main-content-box");

var currentPageName = "";




function LoadPage(pagename) {
    currentPageName = pagename;
    contentbox.innerHTML = "";
    $("#main-content-box").load(`${pagename}.html`);
};










