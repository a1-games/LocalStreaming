



async function LoadSavedColorScheme()
{
    let linkElem = document.createElement("link");
    let savedCS = localStorage.getItem("CURRENT_COLORSCHEME");

    if (savedCS == null)
    {
        savedCS = "cyan";
        localStorage.setItem("CURRENT_COLORSCHEME", "cyan");
    }

    linkElem.rel = "stylesheet";
    linkElem.href = `scripts/CSS/colorSchemes/${savedCS}.css`;

    document.head.append(linkElem);
}




LoadSavedColorScheme();





