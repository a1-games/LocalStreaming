







// pseudo-encrypted name because the function can be read by unwanted visitors
async function X67JPLKIH33(jsonResponse)
{
    CheckIPWhitelist(jsonResponse.ip)
}



async function GetPageAccess(clientIP)
{
    let data = {
        "ip" : clientIP,
    };
    
    let response = await fetch(`/whitelistcheck`, {
        method : "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body : JSON.stringify(data),
    })
    
    return await response.text();
}

async function CheckIPWhitelist(clientIP)
{
    let resp = await GetPageAccess(clientIP);
    //console.log(resp)
    if (resp != "")
    {
        document.write(resp);

    }
}











