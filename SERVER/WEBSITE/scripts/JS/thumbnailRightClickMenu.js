let menuParent = document.createElement("div");
let removeWatchData_toggle = document.createElement("input")
removeWatchData_toggle.type = "checkbox";

function AddThumbnailRightClickMenu()
{
    document.body.append(menuParent);
    menuParent.innerText = "Configurations";
    menuParent.className = "testing fucker";
    menuParent.style.backgroundColor = "#888888";
    menuParent.style.position = "absolute";
    menuParent.style.zIndex = "9999";
    menuParent.style.flexDirection = "column";  
    menuParent.style.display = "none";

    let removeWatchData_div = document.createElement("div")
    removeWatchData_div.style.display = "flex";
    removeWatchData_div.style.flexDirection = "row";
    
    let removeWatchData_label = document.createElement("div")
    removeWatchData_label.innerText = "Delete Watch Progress";
    
    let removeWatchData_button = document.createElement("div")
    removeWatchData_button.innerText = "DELETE";
    removeWatchData_button.style = "display: none; width: auto; heigh: auto; background-color: red; cursor: pointer;";
    removeWatchData_button.onclick = () => {
        // remove watch data for this item
        console.log("watch data remove is not yet implemented");
    }
    removeWatchData_toggle.onclick = () => {
        removeWatchData_button.style.display = removeWatchData_toggle.checked ? "flex" : "none";
    }


    
    removeWatchData_div.append(removeWatchData_toggle);
    removeWatchData_div.append(removeWatchData_label);
    removeWatchData_div.append(removeWatchData_button);
    menuParent.append(removeWatchData_div);
}
AddThumbnailRightClickMenu();


document.addEventListener("contextmenu", (pointerEvent) => {
    
    if (pointerEvent.target.className.includes("content-thumbnail"))
    {
        pointerEvent.preventDefault();


        //x and y position of mouse or touch
        let mouseX = pointerEvent.clientX || pointerEvent.touches[0].clientX;
        let mouseY = pointerEvent.clientY + window.scrollY || pointerEvent.touches[0].clientY + window.scrollY;

        //height and width of menu
        //getBoundingClientRect() method returns the size of an element and its position relative to the viewport
        let menuHeight = menuParent.getBoundingClientRect().height;
        let menuWidth = menuParent.getBoundingClientRect().width;

        //width and height of screen
        //innerWidth returns the interior width of the window in pixels
        let width = window.innerWidth;
        let height = window.innerHeight;

        //If user clicks/touches near right corner
        if (width - mouseX <= 200) {
          menuParent.style.left = width - menuWidth + "px";
          menuParent.style.top = mouseY + "px";
          //right bottom
          if (height - mouseY <= 200) {
            menuParent.style.top = mouseY - menuHeight + "px";
          }
        }
        //left
        else {
            menuParent.style.left = mouseX + "px";
            menuParent.style.top = mouseY + "px";
          //left bottom
          if (height - mouseY <= 200) {
            menuParent.style.top = mouseY - menuHeight + "px";
          }
        }
        //display the menu
    
        removeWatchData_toggle.checked = false;

        //pointerEvent.preventDefault();
        menuParent.style.display = "flex";
    }
});
