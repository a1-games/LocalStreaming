




const rightsideDiv = document.getElementById("rightside");




function LoadPage(pagename) {
    rightsideDiv.innerHTML = "";
    $("#rightside").load(`page_${pagename}.html`);
};










