




const contentbox = document.getElementById("main-content-box");




function LoadPage(pagename) {
    contentbox.innerHTML = "";
    $("#main-content-box").load(`${pagename}.html`);
};










