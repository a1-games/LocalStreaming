


var colorscheme_CSSElement = document.getElementById("colorscheme");

var colorscheme_Dropdown;

var savedCS = "";


async function SelectColorScheme(schemeName)
{
    // set user's new color scheme on server
    
    // change for client:
    localStorage.setItem("CURRENT_COLORSCHEME", schemeName);
    LoadSavedColorScheme();
}



async function LoadSavedColorScheme(user)
{
    if (user != null)
    {
        savedCS = user.ColorScheme;
        let colorscheme_InputElement = document.getElementById("colorscheme-input");
        console.log(colorscheme_InputElement);
    }
    if (savedCS == null)
        savedCS = localStorage.getItem("CURRENT_COLORSCHEME");

    if (savedCS == null)
    {
        savedCS = "cyan";
        localStorage.setItem("CURRENT_COLORSCHEME", savedCS);
    }
    if (user != null)
    {
        colorscheme_InputElement.value = savedCS;
    }
    colorscheme_CSSElement.href = `scripts/CSS/colorSchemes/${savedCS}.css`;
}


async function LoadColorschemeDropdown(selectedScheme)
{
    colorscheme_Dropdown = document.getElementById("colorscheme-dropdown");
    let colorschemes = [
        "cyan",
        "grayscale",
        "bubblegum",
    ];
    for (let i = 0; i < colorschemes.length; i++) {
        AddDropdownOption(colorschemes[i]);
        if (colorschemes[i] == selectedScheme)
        {
            colorscheme_Dropdown.selectedIndex = i;
        }
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


LoadSavedColorScheme();




