
var userList = [];
var currentUser = {};
var selectedUserIcon = null;
const userTab = document.getElementById("user-manager");
const userIconsBox = document.getElementById("user-icons-box");

async function SetLocalUser(username)
{
    localStorage.setItem("CURRENT_USER", username);
}
async function GetLocalUser()
{
    let name = localStorage.getItem("CURRENT_USER");
    return name;
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
    SetLocalUser(username);
    selectedUserIcon.id = "";

    let allIconDivs = userIconsBox.getElementsByClassName("userIcon");
    //                                    -1 bc the "+" icon is in the list
    for (let i = 0; i < allIconDivs.length-1; i++) {
        if (allIconDivs[i].getAttribute("name") == username)
        {
            selectedUserIcon = allIconDivs[i];
            break;
        }
        console.log(username + "   " + allIconDivs[i].getAttribute("name"))
    }
    selectedUserIcon.id = "userIcon-chosen";
    console.log(" selecting user "+username);
}

async function SpawnUsers()
{
    let response = await fetch('http://localhost:3030/users');
    userList = await response.json();

    currentUser = await GetLocalUser();

    //console.log(userList)

    // spawn all the icons
    for (let i = 0; i < userList.length; i++) {
        let icondiv = document.createElement("div")
        icondiv.className = "userIcon";
        icondiv.onclick = () => SelectUser(userList[i].Username);
        icondiv.innerText = userList[i].Username[0];
        icondiv.setAttribute("name", userList[i].Username);
        //icondiv.style.background = `linear-gradient(transparent, ${userList[i].Color})`;
        icondiv.style.background = `radial-gradient(center center, circle cover, #ffeda3, transparent)`;
        icondiv.style.color = `var(--backgroundColo)`;

        // select the icon of the stored CURRENTUSER
        if (userList[i].Username == currentUser)
        {
            icondiv.id = "userIcon-chosen";
            selectedUserIcon = icondiv;
        }

        userIconsBox.prepend(icondiv);
    }
    
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



function OpenCreateUserMenu()
{
    createUserBox.style.display = "block";
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



function ShadeColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}
function InvertColor(color) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, 255 - parseInt(color, 16))).toString(16)).substr(-2));
}












