
const clamp = (num, min, max) => Math.min(Math.max(num, min), max);


const video = document.getElementById('video-player');

const videoControlBar = document.getElementById("video-control-bar");
const playpauseButton = document.getElementById('button-play-pause');
const airplayButton = document.getElementById('button-airplay');
const fullscreenButton = document.getElementById('button-fullscreen');

const scrubber = document.getElementById('video-progress-scrubber');
const seekTooltip = document.getElementById('seek-tooltip');
const seekThumb = document.getElementById('video-scrubber-thumb');
const seek = document.getElementById('seek');
const progressBar = document.getElementById('progress-bar');
const bufferBar = document.getElementById('buffered-progress-bar');

const timeElapsed = document.getElementById('time-elapsed');
const duration = document.getElementById('duration');

let textColor = getComputedStyle(colorscheme_CSSElement).getPropertyValue('--textColor');
ColorizePNG(playpauseButton, textColor, 1);
ColorizePNG(airplayButton, textColor, 1);
ColorizePNG(fullscreenButton, textColor, 1);




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
playpauseButton.addEventListener('click', togglePlay);

// do when video starts playing
video.addEventListener('play', () => {
    playpauseButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_pause.png')";
    videoControlBar.style.display = "flex";
});
// do when video becomes paused
video.addEventListener('pause', () => {
    playpauseButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_play.png')";
    videoControlBar.style.display = "flex";
});



// disable default controls
video.controls = false;





// formatTime takes a time length in seconds and returns the time in
// minutes and seconds
function formatTime(timeInSeconds)
{
    const result = new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  
    return {
        hours: result.substr(0, 2),
        minutes: result.substr(3, 2),
        seconds: result.substr(6, 2),
    };
};


function updateTimeElapsed()
{
    let time = formatTime(Math.round(video.currentTime));
    // if the video is over an hour, show hour field
    let h = parseInt(time.hours)
    if (h > 0)
    {
        timeElapsed.innerText = `${h}:${time.minutes}:${time.seconds}`;
        timeElapsed.setAttribute('datetime', `${h}h ${time.minutes}m ${time.seconds}s`)
    }
    // if the video is under an hour, only show minutes and seconds
    else
    {
        timeElapsed.innerText = `${time.minutes}:${time.seconds}`;
        timeElapsed.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    }
    
    seek.value = video.currentTime;
    progressBar.value = video.currentTime;
    SetThumbPos(video.currentTime);
}

video.addEventListener('progress', function() {
    let bf = this.buffered;
    let range = bf.length-1;

    // length has to be at least 1
    if (range < 0) return;

    let loadStartPercentage = bf.start(0) / this.duration;
    let loadEndPercentage = bf.end(range) / this.duration;
    let loadPercentage = loadEndPercentage - loadStartPercentage;
    
    bufferBar.style.width = `${loadPercentage * 100}%`;
    
});

function initializeVideo()
{
    let videoDuration = Math.round(video.duration);
    let time = formatTime(videoDuration);

    seek.setAttribute('max', videoDuration);
    progressBar.setAttribute('max', videoDuration);

    // if the video is over an hour, show hours
    let h = parseInt(time.hours)
    if (h > 0)
    {
        duration.innerText = `${h}:${time.minutes}:${time.seconds}`;
        duration.setAttribute('datetime', `${h}h ${time.minutes}m ${time.seconds}s`)
    }
    else
    {
        duration.innerText = `${time.minutes}:${time.seconds}`;
        duration.setAttribute('datetime', `${time.minutes}m ${time.seconds}s`)
    }
    console.log("INITIALIZED VIDEO");
}

video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);



// https://freshman.tech/custom-html5-video/

function updateSeekTooltip(event)
{
    let skipTo = Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10));
    let t = formatTime(skipTo);
    let rect = video.getBoundingClientRect();
    seekTooltip.textContent = `${t.minutes}:${t.seconds}`;
    seekTooltip.style.left = `${event.pageX - rect.left}px`;
}
seek.addEventListener('mousemove', updateSeekTooltip);
function skipAhead(event) {
    let skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    seek.value = skipTo;
    progressBar.value = skipTo;
    console.log("skipahead " + skipTo);

    SetThumbPos(skipTo);

}
seek.addEventListener('input', skipAhead);
seek.addEventListener('onclick', skipAhead);


function SetThumbPos(timevalue)
{
    let valueFactor = timevalue / video.duration;
    console.log("skipping to " + valueFactor)
    seekThumb.style.left = `${Math.floor(clamp(valueFactor*100, 0, 100))}%`;
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

seek.addEventListener("mouseenter", () => ShowHideThumb(true));
seek.addEventListener("mouseenter", () => seekTooltip.style.color = "var(--textColor)");

seek.addEventListener("mouseleave", () => ShowHideThumb(false));
seek.addEventListener("mouseleave", () => seekTooltip.style.color = "transparent");














async function LoadVideo(contentObject)
{

}

















