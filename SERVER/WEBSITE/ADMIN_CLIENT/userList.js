




let adminbox = document.getElementById("user-admin-box");


var userList = {};


async function GetUsers()
{
    let response = await fetch(`http://${IP_ADDRESS}/users`);
    userList = await response.json();
}





async function SpawnUserList()
{
    await GetUsers();

    let even = 0;

    Object.values(userList).forEach(user => {
        
        let userbox = document.createElement("div");
        userbox.classList.add("user-box");

        let usercolorbox = document.createElement("div");
        usercolorbox.classList.add("user-color");
        usercolorbox.style.backgroundColor = user.Color;

        let usernamebox = document.createElement("div");
        usernamebox.classList.add("user-name");
        usernamebox.classList.add("user-info-text");
        usernamebox.innerText = user.Username;
        
        let colorschemebox = document.createElement("div");
        colorschemebox.classList.add("user-colorscheme");
        colorschemebox.classList.add("user-info-text");
        colorschemebox.innerText = user.ColorScheme;

        // every second row
        if (even % 2 == 0)
        {
            // set background more discernible
            userbox.style.backgroundColor = "rgb(0, 0, 0, 0.2)";
        }

        userbox.append(usercolorbox);
        userbox.append(usernamebox);
        userbox.append(colorschemebox);
        
        adminbox.append(userbox);

        even++;
    });
}

























