













function addDropdownOption(seasonData)
{
    let option = document.createElement("option");
    option.value = `season${seasonData.SeasonNumber}`;
    option.innerHTML = `Season ${seasonData.SeasonNumber} [ ${seasonData.EpisodeCount} Episodes ]`;
    
    paymentDropdown.appendChild(option);
}















