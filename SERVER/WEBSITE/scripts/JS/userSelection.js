

const userTab = document.getElementById("user-manager");
const userIcons = document.getElementById("user-icons-box");

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

async function SelectUser(event)
{

    
    
    
        
}

async function SpawnUsers()
{
    var response = await fetch('http://localhost:3030/users');
    var userList = await response.json();
    //console.log(userList)

    // spawn all the icons
    // select the icon of the stored CURRENTUSER
    // hide the rest
}

SpawnUsers();








// --------- User Creation Client Side ----------
const colorPicker = document.getElementById("usercolor-input");
const nameInput = document.getElementById("username-input");
const firstLetter = document.getElementById("showcase-usericon");

nameInput.addEventListener("input", (ev) => ChangeFirstLetter(ev), false);
colorPicker.addEventListener("input", (ev) => ChangeNameTagColor(ev), false);

function ChangeFirstLetter(event)
{
    let letter0 = nameInput.value[0];
    if (letter0 != undefined)
        firstLetter.innerText = letter0;
    else
        firstLetter.innerText = "";
    // dont trigger parent onclick
    event.stopPropagation();
}

function ChangeNameTagColor(event)
{
    let ligherColor = ShadeColor(colorPicker.value, 160)
    nameInput.style.backgroundColor = `${ligherColor}70`;

    // dont trigger parent onclick
    event.stopPropagation();
}



function ShadeColor(color, amount) {
    return '#' + color.replace(/^#/, '').replace(/../g, color => ('0'+Math.min(255, Math.max(0, parseInt(color, 16) + amount)).toString(16)).substr(-2));
}












