



const video = document.getElementById('video-player');

const videoControlBar = document.getElementById("video-control-bar");
const playpauseButton = document.getElementById('button-play-pause');
const airplayButton = document.getElementById('button-airplay');
const fullscreenButton = document.getElementById('button-fullscreen');


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
    videoControlBar.style.display = "hidden";
});
// do when video becomes paused
video.addEventListener('pause', () => {
    playpauseButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_play.png')";
    videoControlBar.style.display = "flex";
});




//video.controls = false;





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
}

function initializeVideo()
{
    let videoDuration = Math.round(video.duration);
    let time = formatTime(videoDuration);

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

}

video.addEventListener('loadedmetadata', initializeVideo);
video.addEventListener('timeupdate', updateTimeElapsed);



// https://freshman.tech/custom-html5-video/




async function LoadVideo(contentObject)
{

}

















