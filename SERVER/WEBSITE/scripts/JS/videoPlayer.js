

// if picture in picture becomes requested,
// it is stated how to add it in this article
// https://freshman.tech/custom-html5-video/
// article about streaming the video
// https://img.ly/blog/how-to-stream-videos-using-javascript-and-html5/
// article showing how to implement subtitles
// https://blog.addpipe.com/10-advanced-features-in-html5-video-player/#showingcaptionsorsubtitlesduringplayback
// this is needed for dothraki and other GOT subs


clamp = (num, min, max) => Math.min(Math.max(num, min), max);

videoDuration = 0.0;
videoVolume = 1.0;
video = document.getElementById('video-player');
videosource = document.getElementById('video-source');
videoIsPlaying = false;

introStart = -1;
introEnd = -1;

skipIntroButton = document.getElementById("skip-intro-button");

videoPlayerBox = document.getElementById("video-player-box");

videoControlBar = document.getElementById("video-control-bar");
playpauseButton = document.getElementById('button-play-pause');
airplayButton = document.getElementById('button-airplay');
fullscreenButton = document.getElementById('button-fullscreen');

scrubberParent = document.getElementById('video-progress-parent');
scrubber = document.getElementById('video-progress-scrubber');
seekTooltip = document.getElementById('seek-tooltip');
seekThumb = document.getElementById('video-scrubber-thumb');
seek = document.getElementById('seek');
progressBar = document.getElementById('progress-bar');
bufferBar = document.getElementById('buffered-progress-bar');

timeElapsed = document.getElementById('time-elapsed');
duration = document.getElementById('duration');

volumeButton = document.getElementById('button-volume');
volumeSlider = document.getElementById("volume-slider");
volumeSliderBox = document.getElementById("volume-slider-box");
volumeProgressBar = document.getElementById("volume-progress-bar");

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
        if (currentPageName == ContentPageName["M"] ||
            currentPageName == ContentPageName["S"] )
        {
            action(params);
        }
    });
}


function togglePlay() 
{
    if (video.paused)
    {
        let playpromise = video.play();

        if (playpromise !== undefined) {
            playpromise.then(_ => {
            // Automatic playback started!
            // Show playing UI.
          })
          .catch(error => {
            // Auto-play was prevented
            // Show paused UI.
            console.log(error)
          });
        }
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
    videoIsPlaying = true;
});
// do when video becomes paused
SetEventListener(video, 'pause', () => {
    playpauseButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_play.png')";
    videoIsPlaying = false;
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
    // if time is not valid, return nonnull zero time
    if (timeInSeconds == undefined ||
        timeInSeconds == null ||
        isNaN(timeInSeconds) )
    {
        return {
            hours: "00",
            minutes: "00",
            seconds: "00",
        }
    }

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

lastMinute = 0;
lastSecond = 0;
updates = 0;
function updateTimeElapsed()
{
    let time = formatTime(video.currentTime);
    let secondsPassed = parseInt(video.currentTime);
    
    // show the time
    timeElapsed.innerText = getTimeString(time);
    timeElapsed.setAttribute('datetime', getTimeString(time))
    
    seek.value = video.currentTime;
    progressBar.value = video.currentTime;

    SetThumbPos(video.currentTime);



    
    // do this every 1 second
    if (lastSecond + 0 < secondsPassed )
    {
        lastSecond = secondsPassed;

    
        // if for some reason the skip button isnt hidden
        if (!skipButtonIsHidden)
        {
            // hide if not playing the intro
            if (secondsPassed < introStart ||
                secondsPassed > introEnd)
            {
                ShowHideSkipIntroButton(false);
            }
        }
        else // if it is hidden
        {
            // showing skip intro button if intro is defined and playing
            // this will run from 0 until the intro is over
            if (introStart != -1 &&
                secondsPassed <= introEnd &&
                secondsPassed >= introStart )
            {
                if (secondsPassed >= introStart)
                {
                    ShowHideSkipIntroButton(true);
                }
                if (secondsPassed >= introEnd)
                {
                    ShowHideSkipIntroButton(false);
                }
            }
        }
    }

    
    // this prevents it from subtracting 5 seconds every time the page refreshes.
    // it will instead wait a couple frames before counting
    if (updates <= 5)
    {
        updates++;
    }
    // do this every minute
    else
    {
        let minutesPassed = parseInt(secondsPassed / 60);
        if (lastMinute < minutesPassed)
        {
            console.log(minutesPassed)
            lastMinute = minutesPassed;
            
            let watchedSeconds = secondsPassed;
            // save 5 seconds before to refresh the users memory
            let percentageWP = (watchedSeconds - 5) / videoDuration;
            SaveWatchProgress(currentUser, percentageWP);
        }
    }
}

SetEventListener(video, 'timeupdate', updateTimeElapsed);



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

    console.log("VIDEO INITIALIZED");
}

SetEventListener(video, 'loadedmetadata', () => {
    
    initializeVideo();


    let watchedPercentage = GetWatchProgressFromCurrentObject();
    let watchedSeconds = watchedPercentage * videoDuration;

    // skip to last watched
    if (!isNaN(watchedSeconds))
        SkipTo(watchedSeconds)
    
});

SetEventListener(video, 'loadstart', () => {
    console.log("VIDEO started LOADING.")
});


// error stuff
SetEventListener(video, 'error', (e) => {
    console.log("VIDEO had en ERROR. - " + e);
});

SetEventListener(video, 'abort', (e) => {
    console.log("VIDEO load was ABORTED. - " + e);
});

SetEventListener(video, 'stalled', (e) => {
    console.log("VIDEO load is STALLED. - " + e);
    video.pause();
    // this is when we are stuck with no data
});

SetEventListener(video, 'suspend', (e) => {
    console.log("VIDEO load is SUSPENDED. - " + e);
});

SetEventListener(video, 'waiting', (e) => {
    console.log("VIDEO load is WAITING to load data. - " + e);
});



function updateSeekTooltip(event)
{
    let skipTo = clamp(Math.round((event.offsetX / event.target.clientWidth) * parseInt(event.target.getAttribute('max'), 10)), 0, videoDuration);
    let time = formatTime(skipTo);
    seekTooltip.textContent = getTimeString(time);
    
    let valueFactor = skipTo / videoDuration;
    seekTooltip.style.left = `${clamp(valueFactor*100, 0.0, 100.0)}%`;
}
SetEventListener(seek, 'mousemove', updateSeekTooltip);

function SkipTo(seconds)
{
    video.currentTime = seconds;
    seek.value = seconds;
    progressBar.value = seconds;
    lastSecond = 0;
    
    SetThumbPos(seconds);
    
}
function skipAhead(event) {

    let skipTo = event.target.dataset.seek ? event.target.dataset.seek : event.target.value;
    video.currentTime = skipTo;
    seek.value = skipTo;
    progressBar.value = skipTo;
    lastSecond = 0;
    
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




// --- VOLUME ---
function ToggleMuted() {
    //unmute
    if (video.muted)
    {
        video.muted = false;
        UpdateVolume(videoVolume);
        volumeSlider.value = videoVolume;
    }
    //mute
    else
    {
        video.muted = true;
        video.volume = 0.0;
        // do not call UpdateVolume as it overwrites videoVolume which is used to untoggle mute
        volumeSlider.value = 0.0;
        volumeProgressBar.value = 0.0;
        volumeButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_volume_0.png')";
    }
}
SetEventListener(volumeButton, 'click', ToggleMuted)
SetEventListener(volumeSlider, 'click', (e) => e.stopPropagation() )

function UpdateVolume(volume) {
    if (video.muted)
        video.muted = false;
    
    // set the values
    videoVolume = volume;
    video.volume = videoVolume;
    
    // set the icon
    if ( volume <= 0.22 )
        volumeButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_volume_1.png')";
    else if ( 0.22 < volume && volume <= 0.6 )
        volumeButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_volume_2.png')";
    else if ( 0.6 < volume )
        volumeButton.style.backgroundImage = "url('../../files/IMAGES/Icons/video_volume_3.png')";

    volumeProgressBar.value = volume;
    localStorage.setItem("VOLUME", volume);
}

SetEventListener(volumeSlider, 'input', () => UpdateVolume(volumeSlider.value))





// shifting between volume and time scrubber
volumeBarTimeout = null;
function ShowVolumeBar(show)
{
    if (show)
    {
        volumeSliderBox.style.display = "block";
        scrubberParent.style.display = "none";
    }
    else
    {
        volumeSliderBox.style.display = "none";
        scrubberParent.style.display = "flex";
    }
}
SetEventListener(volumeButton, 'mouseenter', () => KeepVolumeBarVisible() );
SetEventListener(volumeButton, 'mouseleave', () => HideVolumeBar() );
SetEventListener(volumeSliderBox, 'mouseenter', () => KeepVolumeBarVisible() );
SetEventListener(volumeSliderBox, 'mouseleave', () => HideVolumeBar() );


async function KeepVolumeBarVisible()
{
    clearTimeout(volumeBarTimeout);
    ShowVolumeBar(true);
}

async function HideVolumeBar()
{
    clearTimeout(volumeBarTimeout);
    volumeBarTimeout = setTimeout(() => ShowVolumeBar(false), 800); // 0.8 sec
}

// showing toolbar on mouse moved
controlBarTimeout = null;
async function ShowControlBar()
{
    videoControlBar.style.filter = "";
    videoPlayerBox.style.cursor = "auto";
    clearTimeout(controlBarTimeout);
    controlBarTimeout = setTimeout(() => 
    { // do this when mouse has been still for 1.5 sec
        videoControlBar.style.filter = "opacity(0)";
        videoPlayerBox.style.cursor = "none";
    }, 1500); // 1.5 sec
}
SetEventListener(videoControlBar, 'mousemove', ShowControlBar);
SetEventListener(video, 'mousemove', ShowControlBar);



// fullscreen
SetEventListener(fullscreenButton, 'click', () => {
    if (document.fullscreenElement)
    {
        document.exitFullscreen();
    }
    else
    {
        videoPlayerBox.requestFullscreen();
    }
})

async function LoadSavedVolume()
{
    // set saved volume
    let volString = localStorage.getItem("VOLUME");

    let vol = parseFloat(volString != null ? volString : 1.0);

    volumeSlider.value = vol;
    UpdateVolume(vol);

    ShowVolumeBar(false);
}

LoadSavedVolume();

// anything handling video.load / video.play() must not be async!
function LoadVideo()
{
    let CCO = currentContentObject;

    // MOVIE
    if (CCO.contentType == "M")
    {
        video.src = `Content/${ContentFolder["M"]}/${CCO.contentID}/${CCO.contentID}.${CCO.fileType}`;
        //videosource.src = `Content/${ContentFolder["M"]}/${CCO.contentID}/${CCO.contentID}.${CCO.fileType}`;
        //video.poster = `Content/${ContentFolder["M"]}/${CCO.contentID}/thumbnail.jpg`;
    }
    
    // SERIES
    if (CCO.contentType == "S")
    {
        let episodeObject = CCO.seasons[selectedSeason].episodes[selectedEpisode];
        video.src = `Content/${ContentFolder["S"]}/${CCO.contentID}/Season_${selectedSeason+1}/S${selectedSeason+1}E${selectedEpisode+1}.${episodeObject.fileType}`;
        //videosource.src = `Content/${ContentFolder["S"]}/${CCO.contentID}/Season_${selectedSeason+1}/S${selectedSeason+1}E${selectedEpisode+1}.${episodeObject.fileType}`;
        video.poster = `Content/${ContentFolder["S"]}/${CCO.contentID}/Season_${selectedSeason+1}/S${selectedSeason+1}E${selectedEpisode+1}.jpg`;
        //console.log(episodeObject);

        // skip intro button stuff
        // only do this if we defined the intro start and end for this episode
        if ("intro" in episodeObject)
        {
            introStart = episodeObject.intro.start;
            introEnd = episodeObject.intro.end;
        }
    }

    video.load();
}


skipButtonIsHidden = true;
function ShowHideSkipIntroButton(show)
{
    if (show)
    {
        skipIntroButton.style.display = "block";
    }
    else
    {
        skipIntroButton.style.display = "none";
    }
    skipButtonIsHidden = !show;
}






