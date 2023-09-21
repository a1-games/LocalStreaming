

var colorschemes = [
    "cyan",
    "grayscale",
    "bubblegum",
];

var colorscheme_CSSElement = document.getElementById("colorscheme");

var colorscheme_Dropdown;

var savedCS = "";


async function SelectColorScheme(schemeName, user)
{
    //console.log(user)
    localStorage.setItem("CURRENT_COLORSCHEME", schemeName);
    SetColorschemeDropdownSelected(schemeName);
    
    if (schemeName != user.ColorScheme && Object.keys(userList).length != 0)
    {
        SaveColorschemeToUser(schemeName, user);
    }

    // load last to get the new updated scheme
    LoadSavedColorScheme(user);
}

async function SaveColorschemeToUser(colorscheme, user)
{
    // change for client:
    user.ColorScheme = colorscheme;
    // set user's new color scheme on server
    let data = {
        "Username" : user.Username,
        "KeyToEdit" : "ColorScheme",
        "ColorScheme" : colorscheme
    }
    fetch('http://localhost:3030/editUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}


async function LoadSavedColorScheme(user)
{
    if (user != null)
    {
        savedCS = user.ColorScheme;
        localStorage.setItem("CURRENT_COLORSCHEME", savedCS);
    }
    // if we didnt pass a user as argument
    if (savedCS == null)
    {
        savedCS = localStorage.getItem("CURRENT_COLORSCHEME");
    }
    // if this is the first time we load scheme
    if (savedCS == null)
    {
        savedCS = "cyan";
        localStorage.setItem("CURRENT_COLORSCHEME", savedCS);
    }

    // toggle greyscale
    if (savedCS == "grayscale")
    {
        document.getElementById("rightside").classList.add("grayscale");
    }
    else
    {
        document.getElementById("rightside").classList.remove("grayscale");
    }

    colorscheme_CSSElement.href = `scripts/CSS/colorSchemes/${savedCS}.css`;

    // change png after 200 milliseconds bc the new css reference above isn't loaded yet
    // also disable setting a new colorscheme until this is loaded
    document.body.style.pointerEvents = "none";
    setTimeout(SetPNGColors, 200);
}

async function SetPNGColors()
{
    // set the png images through javascript instead of css
    let textColor = getComputedStyle(colorscheme_CSSElement).getPropertyValue('--textColor');
    ColorizePNG(document.getElementById("website-logo"), textColor);
    ColorizePNG(document.getElementById("search-icon"), textColor);
    ColorizePNG(document.getElementById("favourites-icon"), textColor);
    document.body.style.pointerEvents = "all";
}

function SetColorschemeDropdownSelected(colorscheme)
{
    for (let i = 0; i < colorschemes.length; i++) {
        if (colorschemes[i] == colorscheme)
        {
            colorscheme_Dropdown.selectedIndex = i;
        }
    }
}

async function LoadColorschemeDropdown()
{
    colorscheme_Dropdown = document.getElementById("colorscheme-dropdown");
    for (let i = 0; i < colorschemes.length; i++) {
        AddDropdownOption(colorschemes[i]);
    }
}

function AddDropdownOption(colorscheme)
{
    let option = document.createElement("option");
    option.value = colorscheme;
    option.className = "colorscheme-option";
    option.innerText = colorscheme[0].toUpperCase() + colorscheme.slice(1);    
    
    colorscheme_Dropdown.append(option);
}


//LoadSavedColorScheme();




