









async function RemoveWatchProgress(user, contentID)
{

    let wpKey = `WP_${contentID}`;


    // fetch user

    // remove the WP here

    // overwrite the user

    // idk how else to delete a property, i dont think you can do it inside the json file
}

function GetWatchProgressFromCurrentObject()
{
    if (!(currentContentObject.contentID in currentUser.WatchProgress))
        return 0;

    let wp = currentUser.WatchProgress[currentContentObject.contentID];

    // the current selected episode in a series
    if (currentContentObject.contentType == "S")
    {
        return wp[`S${selectedSeason+1}E${selectedEpisode+1}`];
    }

    // if "M"
    return wp;
}

function GetEpisodeWatchProgress(seasonIndex, episodeIndex)
{
    if (!(currentContentObject.contentID in currentUser.WatchProgress))
        return 0;

    wp = currentUser.WatchProgress[currentContentObject.contentID]

    return wp[`S${seasonIndex+1}E${episodeIndex+1}`];
}

function GetWatchProgress(contentID, contentType)
{
    //console.log(currentUser[`WP_${contentID}`])

    // if we dont have progress for this contentID, return 0
    if (!(contentID in currentUser.WatchProgress) && contentType != "C" && contentType != "E")
    return 0;

    // get shorthand
    let wp = currentUser.WatchProgress[contentID];

    if (contentType == "M")
    {
        return wp;
    }

    // a series as a whole
    if (contentType == "S")
    {
        let wpValues = Object.values(wp);
        // return watched episode progress out of all episodes
        //console.log(contentID)
        return GetCummulativeWatchProgress(wpValues) / GetEpisodesCount(contentID);
    }

    // the current selected episode in a series
    if (contentType == "E")
    {
    }

    if (contentType == "C")
    {
        //console.log(contentID)
        let watchorder = collectionObjects[contentID].watchOrder;
        let cummulative = 0;

        for (let i = 0; i < watchorder.length; i++) {
            // WARNING: DO NOT NEST COLLECTIONS! This will cause infinite loop here
            cummulative += GetWatchProgress(watchorder[i].title, watchorder[i].contentType);
        }
        // return watched episode progress out of all episodes
        return cummulative / watchorder.length;
    }

    return 0;
}

function GetEpisodesCount(seriesID)
{
    let count = 0;
    for (let i = 0; i < seriesObjects[seriesID].seasons.length; i++) {
        for (let j = 0; j < seriesObjects[seriesID].seasons[i].episodes.length; j++) {
            count++;
        }
    }
    return count;
}

function GetCummulativeWatchProgress(progressList)
{
    let prog = 0;

    for (let i = 0; i < progressList.length; i++) {
        prog += progressList[i];
    }

    return prog;
}

async function SaveWatchProgress(user, progress = 0)
{
    let currentWP = currentUser.WatchProgress;

    if (currentContentObject.contentType == "M")
    {
        currentWP[currentContentObject.contentID] = progress;
    }
    
    if (currentContentObject.contentType == "S")
    {
        // create it if this is the first timer
        if (!(currentContentObject.contentID in currentUser.WatchProgress))
        {
            currentUser.WatchProgress[currentContentObject.contentID] = {};
        }
        // series are an array of watchtimes
        currentWP[currentContentObject.contentID][`S${selectedSeason+1}E${selectedEpisode+1}`] = progress;
    }
    

    // change for client:
    user.WatchProgress = currentWP;
    
    // change on server:
    let data = {
        "Username" : user.Username,
        "KeyToEdit" : "WatchProgress",
        "NewValue" : currentWP,
    }
    fetch(`http://${IP_ADDRESS}/editUser`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}





















