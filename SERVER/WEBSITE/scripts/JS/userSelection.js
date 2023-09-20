
var userList = {};
var currentUser = {"Username":"Default", "Color":"#FFFFFF","ColorScheme":"cyan"};
var selectedUserIcon = null;
const userTab = document.getElementById("sidebar");
const userIconsBox = document.getElementById("user-icons-box");

async function GetLocalUsername()
{
    let name = localStorage.getItem("CURRENT_USER");
    return name;
}
async function LoadCurrentUser()
{
    let username = await GetLocalUsername();
    Object.values(userList).forEach(user => {
        if (user.Username == username)
        {
            currentUser = user;
            //console.log("Selected user: " + currentUser.Username);
            return;
        }
    });
    if (currentUser != null)
    {
        SelectColorScheme(currentUser.ColorScheme, currentUser);
        //console.log("setting colorscheme: " + currentUser.Username);
    }
}



async function OpenCloseUserMenu(open)
{
    if (open)
        userTab.style.width = "22vw";
    else
        userTab.style.width = "8rem";
}

function DontCloseUserTab(event)
{
    // dont trigger parent onclick
    event.stopPropagation();
}

async function SelectUser(username)
{
    localStorage.setItem("CURRENT_USER", username);
    LoadCurrentUser();

    if (selectedUserIcon != null)
        selectedUserIcon.id = "";

    let allIconDivs = userIconsBox.getElementsByClassName("userIcon");
    //                                    -1 bc the "+" icon is in the list
    for (let i = 0; i < allIconDivs.length-1; i++) {
        if (allIconDivs[i].getAttribute("name") == username)
        {
            selectedUserIcon = allIconDivs[i];
            break;
        }
    }
    if (selectedUserIcon != null)
        selectedUserIcon.id = "userIcon-chosen";
    //console.log(" selecting user "+username);
}

async function SpawnUsers()
{
    let response = await fetch('http://localhost:3030/users');
    userList = await response.json();

    await LoadCurrentUser();

    //console.log(userList)

    // spawn all the icons
    Object.values(userList).forEach(user => {
        SpawnOneUser(user);
    });
    
}

function SpawnOneUser(user)
{
    let icondiv = document.createElement("div")
    icondiv.className = "userIcon";
    icondiv.onclick = () => SelectUser(user.Username);
    icondiv.innerText = user.Username[0];
    icondiv.setAttribute("name", user.Username);
    icondiv.style.background = `linear-gradient(transparent, ${user.Color})`;
    //icondiv.style.background = `radial-gradient(center center, circle cover, #ffeda3, transparent)`;
    icondiv.style.color = `var(--backgroundColor)`;

    // select the icon of the stored CURRENTUSER
    if (user.Username == currentUser.Username)
    {
        icondiv.id = "userIcon-chosen";
        selectedUserIcon = icondiv;
    }

    userIconsBox.prepend(icondiv);
}



SpawnUsers();






// --------- User Creation Client Side ----------
const createUserBox = document.getElementById("create-user-box");
createUserBox.style.display = "none";
const colorPicker = document.getElementById("usercolor-input");
const nameInput = document.getElementById("username-input");
const firstLetter = document.getElementById("showcase-usericon-letter");
const saveUserButton = document.getElementById("create-user-button");
// disable button until username is valid
saveUserButton.style.pointerEvents = "none";
nameInput.addEventListener("input", (ev) => ChangeFirstLetter(ev), false);
colorPicker.addEventListener("input", (ev) => ChangeNameTagColor(ev), false);



function OpenCreateUserMenu(open)
{
    if (open)
        createUserBox.style.display = "block";
    else
        createUserBox.style.display = "none";
}







function EmptyInputOnSelect(inputElement)
{
    inputElement.value = "";
}

function ChangeFirstLetter(event)
{
    let letter0 = nameInput.value[0];
    if (letter0 != undefined)
    {
        // capitalize first letter
        nameInput.value = letter0.toUpperCase() + nameInput.value.slice(1);    
        firstLetter.innerText = nameInput.value[0];
    }
    else
        firstLetter.innerText = "";

    // toggle button clickable
    saveUserButton.style.pointerEvents = "none";
    if (nameInput.value.length >= 2)
    {
        let nameUsed = false;
        for (let i = 0; i < userList.length; i++) {
            if (userList[i] == nameInput.value)
            {
                nameUsed = true;
                break;
            }
        }
        if (!nameUsed)
        {
            saveUserButton.style.pointerEvents = "all";
        }
    }



    // dont trigger parent onclick
    event.stopPropagation();
}

function ChangeNameTagColor(event)
{
    let ligherColor = ShadeColor(colorPicker.value, 150)
    nameInput.style.background = `linear-gradient(90deg, #FFFFFF70, ${ligherColor}70`;
    let invColor = InvertColor(colorPicker.value)
    firstLetter.style.color = invColor;

    // dont trigger parent onclick
    event.stopPropagation();
}

async function WriteUserOnServer(event)
{
    event.preventDefault();

    let newUser = {
        "Username" : document.getElementById("username-input").value,
        "Color" : document.getElementById("usercolor-input").value,
        // savedCS gets set on page load
        "ColorScheme" : savedCS
    }

    //console.log("trying to create new user " + newUser.Username);

    // set user's new color scheme on server
    fetch('http://localhost:3030/createUser', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newUser),
    });

    userList[newUser.Username] = newUser;
    SpawnOneUser(newUser);
    SelectUser(newUser.Username);

    OpenCreateUserMenu(false);
}



function ShadeColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
function InvertColor(color) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, 255 - parseInt(color, 16))).toString(16)).substr(-2));
}












