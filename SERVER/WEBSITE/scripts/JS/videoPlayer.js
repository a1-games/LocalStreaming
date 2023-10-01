
clamp = (num, min, max) => Math.min(Math.max(num, min), max);

videoDuration = 0.0;
video = document.getElementById('video-player');

videoControlBar = document.getElementById("video-control-bar");
playpauseButton = document.getElementById('button-play-pause');
airplayButton = document.getElementById('button-airplay');
fullscreenButton = document.getElementById('button-fullscreen');
volumeButton = document.getElementById('button-volume');

scrubber = document.getElementById('video-progress-scrubber');
seekTooltip = document.getElementById('seek-tooltip');
seekThumb = document.getElementById('video-scrubber-thumb');
seek = document.getElementById('seek');
progressBar = document.getElementById('progress-bar');
bufferBar = document.getElementById('buffered-progress-bar');

timeElapsed = document.getElementById('time-elapsed');
duration = document.getElementById('duration');

textColor = getComputedStyle(colorscheme_CSSElement).getPropertyValue('--textColor');
ColorizePNG(playpauseButton, textColor, 1);
ColorizePNG(airplayButton, textColor, 1);
ColorizePNG(fullscreenButton, textColor, 1);
ColorizePNG(volumeButton, textColor, 1);


function SetEventListener(element, eventKey, action)
{
    if (element.getAttribute(`${eventKey}_listener`) == "true") return;
    element.setAttribute(`${eventKey}_listener`, "true");

    element.addEventListener(eventKey, (params) => {
        // only allow it in the movie page
        if (currentPageName == ContentPageName["M"])
        {
            action(params);
        }
    });
}


function togglePlay() 
{
    if (video.paused)
    {
        video.play();
    }
    else
    {
        video.pause();
    }
}

SetEventListener(playpauseButton, 'click', togglePlay);
SetEventListener(video, 'click', togglePlay);

// do when video starts playing
SetEventListener(video, 'play', () => {
    playpauseButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_pause.png')";
    videoControlBar.style.display = "flex";
});
// do when video becomes paused
SetEventListener(video, 'pause', () => {
    playpauseButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_play.png')";
    videoControlBar.style.display = "flex";
});

SetEventListener(document.body, 'keyup', (e) => {
    if (e.code === "ArrowUp")
    {
        // volume up
    }
    if (e.code === "ArrowDown")
    {
        // volumde down
    }
    if (e.code == "Space")
    {
        togglePlay();
    }
});


// disable default controls
video.controls = false;





// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds)
{
    let result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
    
    return {
        hours: result.substr(0, 2),
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};

function getTimeString(timeObject)
{
    let h = parseInt(timeObject.hours)
    if (h > 0)
    {
        return `${h}:${timeObject.minutes}:${timeObject.seconds}`;
    }
    // if the video is under an hour, only show minutes and seconds
    else
    {
        return `${timeObject.minutes}:${timeObject.seconds}`;
    }
}


function updateTimeElapsed()
{
    let time = formatTime(video.currentTime);
    
    // show the time
    timeElapsed.innerText = getTimeString(time);
    timeElapsed.setAttribute('datetime', getTimeString(time))
    
    seek.value = video.currentTime;
    progressBar.value = video.currentTime;

    //SetThumbPos(video.currentTime);
}

SetEventListener(video, 'progress', () => {
    let bf = video.buffered;
    let range = bf.length-1;
    
    // length has to be at least 1
    if (range < 0) return;
    
    let loadStartPercentage = bf.start(0) / video.duration;
    let loadEndPercentage = bf.end(range) / video.duration;
    let loadPercentage = loadEndPercentage - loadStartPercentage;
    
    bufferBar.style.width = `${loadPercentage * 100}%`;
    
});

function initializeVideo()
{
    videoDuration = Math.floor(video.duration);
    let time = formatTime(videoDuration);
    
    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);
    
    // set time text
    duration.innerText = getTimeString(time);
    duration.setAttribute('datetime', getTimeString(time))

    console.log("INITIALIZED VIDEO");
}

SetEventListener(video, 'loadedmetadata', initializeVideo);

SetEventListener(video, 'timeupdate', updateTimeElapsed);



// https://freshman.tech/custom-html5-video/

function updateSeekTooltip(event)
{
    let skipTo = clamp(Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10)), 0, videoDuration);
    let time = formatTime(skipTo);
    seekTooltip.textContent = getTimeString(time);
    
    let valueFactor = skipTo / videoDuration;
    seekTooltip.style.left = `${clamp(valueFactor*100, 0.0, 100.0)}%`;
}
SetEventListener(seek, 'mousemove', updateSeekTooltip);

function skipAhead(event) {

    let skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    seek.value = skipTo;
    progressBar.value = skipTo;
    
    SetThumbPos(skipTo);
    
}
SetEventListener(seek, 'input', skipAhead);
SetEventListener(seek, 'onclick', skipAhead);


function SetThumbPos(timevalue)
{
    let valueFactor = timevalue / videoDuration;
    seekThumb.style.left = `${clamp(valueFactor*100, 0.0, 100.0)}%`;
}

function ShowHideThumb(show)
{
    if (show)
    {
        seekThumb.classList.add("video-scrubber-thumb-active");
    }
    else
    {
        seekThumb.classList.remove("video-scrubber-thumb-active");
    }
}

SetEventListener(seek, "mouseenter", () => {
    ShowHideThumb(true);
    seekTooltip.style.color = "var(--textColor)";
});

SetEventListener(seek, "mouseleave", () => {
    ShowHideThumb(false);
    seekTooltip.style.color = "transparent";
});












async function LoadVideo(contentObject)
{

}

















