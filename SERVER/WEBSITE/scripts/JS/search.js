








async function OpenSearchBar()
{
    let searchBar = document.getElementById("search-bar");

    searchBar.classList.remove("searchbar-closed");
    searchBar.classList.add("searchbar-open");
}


// strict spelling:
async function SearchByContentTitle(searchInput)
{
    let sInput = searchInput.ToLower();
    for (let i = 0; i < contentTitles.length; i++) {
        let cTitle = contentTitles[i].ToLower();
        if (cTitle.includes(sInput))
        {
            // show this element
        }
    }
}

// percentage match ( very bad performance )
async function SearchByContentTitle(searchInput, contentObjects, percentageBeforeShow)
{
    let sInput = searchInput.toLowerCase();

    let matches = [];

    let ctitles = Object.values(movieObjects);

    for (let i = 0; i < ctitles.length; i++) {
        
        let cTitle = ctitles[i].contentTitle.toLowerCase();

        let matchCount = 0;
        for (let j = 0; j < sInput.length; j++) {
        
            for (let l = 0; l < cTitle.length; l++) {
                
                if (cTitle[l] == sInput[j])
                {
                    matchCount++;
                    break;
                }
            }
    
        }

        // if the letter match count is over the threshold
        let matchCalc = matchCount / sInput.length;
        //console.log(matchCalc)
        let threshCalc = percentageBeforeShow / 100.0;
        if (matchCalc >= threshCalc)
        {
            // show this element
            console.log("search matched " + cTitle);
            matches.push(ctitles[i]);
        }

    }
    
    // sort the matching elements after highest match

    
}

















