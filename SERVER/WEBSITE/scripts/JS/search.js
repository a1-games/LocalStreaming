
let searchForm = document.getElementById("search-form");
let searchBar = document.getElementById("search-bar");


var searchResults_M = [];
var searchResults_S = [];
var searchResults_C = [];




async function OpenSearchBar()
{
    searchBar.classList.remove("searchbar-closed");
    searchBar.classList.add("searchbar-open");
}

async function SubmitSearch()
{
    if (searchBar.value == "" |
        searchBar.value == "Search")
        return;

    searchResults_M = await SearchStrict(searchBar.value, movieObjects)
    searchResults_S = await SearchStrict(searchBar.value, seriesObjects)
    searchResults_C = await SearchStrict(searchBar.value, collectionObjects)
    //console.log(searchResults_M)


    // load the search page
    LoadPage("page_search");


    
}



async function LoadSearchResults()
{
    LoadSearchResultsFromMatched("M", searchResults_M)
    LoadSearchResultsFromMatched("S", searchResults_S)
    LoadSearchResultsFromMatched("C", searchResults_C)

    ResizeAllThumbnailDivs();
}



// spawning the result rows

async function LoadSearchResultsFromMatched(contentType, searchMatchedObjects)
{
    let mainBox = document.getElementById("main-content-box");

    if (Object.keys(searchMatchedObjects).length <= 0)
        return;
    
    SpawnThumbnailRow(mainBox, contentType, ContentFolder[contentType], searchMatchedObjects, false);
    LoadWatchProgressForContentType(contentType);
    
}













// strict spelling:
async function SearchStrict(searchInput, contentObjects)
{
    let sInput = searchInput.toLowerCase();
    let matches = {};
    for (let [key, value] of Object.entries(contentObjects)) {
        let cTitle = value.contentTitle.toLowerCase();
        if (cTitle.includes(sInput))
        {
            // show this element
            matches[key] = value;
        }
    }
    return matches;
}

// percentage match ( very bad performance )
async function SearchPercentage(searchInput, contentObjects, percentageBeforeShow)
{
    let sInput = searchInput.toLowerCase();

    let matches = {};

    for (let [key, value] of Object.entries(contentObjects)) {
        
        let cTitle = value.contentTitle.toLowerCase();

        let matchCount = 0;
        for (let j = 0; j < sInput.length; j++) {
        
            for (let l = 0; l < cTitle.length; l++) {
                
                if (cTitle[l] == sInput[j])
                {
                    matchCount++;
                    console.log(cTitle[l] + " was a match for " + sInput + " at index " + j);
                    break;
                }
            }
    
        }

        // if the letter match count is over the threshold
        let matchCalc = matchCount / sInput.length;
        //console.log(cTitle + " is a " + (matchCalc*100) + "% match")
        //console.log(matchCalc)
        let threshCalc = percentageBeforeShow / 100.0;
        if (matchCalc >= threshCalc)
        {
            console.log(cTitle)
            // show this element
            matches[key] = value;
        }
    }

    
    // sort the matching elements after highest match

    




    // return sorted matches
    return matches;
}













