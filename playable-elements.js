let audio = document.getElementById("audioFile");
let fileSelector = document.getElementById("audioFile-selector");
let isPlaying = false;
let musicPlayer = document.getElementsByClassName("music-player")[0];
let playbackSwitch = document.getElementById("playback-switch");
let progressBar = document.getElementsByClassName("progress-bar")[0];
let speedMenu = document.getElementsByClassName("speed-menu")[0];
let playbackSpeed = speedMenu.querySelectorAll("div");
let timer = document.getElementById("timer");
let toggle = document.getElementById("music-player-switch");
let volume = document.getElementsByClassName("volume")[0];
let volumeBar = document.getElementById("volume-bar");
let volumeIcon = document.getElementById("volume-icon");

function playVideo(videoID) {
  let video = document.getElementById(videoID);
  console.log(videoID, video);
  video.play();
}

audio.onplaying = function () {
  isPlaying = true;
};
audio.onpause = function () {
  isPlaying = false;
};
toggle.addEventListener("input", function () {
  if (fileSelector.files[0] != undefined) {
    if (toggle.checked) {
      musicPlayer.style.transform = "scaleY(1) translateX(0px)";
      audio.src = URL.createObjectURL(fileSelector.files[0]);
    } else {
      musicPlayer.style.transform = "scaleY(0) translateX(-100px)";
    }
  } else {
    alert("Select an audio file to activate the music player");
    toggle.checked = false;
  }
});

playbackSwitch.addEventListener("input", function controlPlayback() {
  if (playbackSwitch.checked) {
    audio.play();
  } else {
    audio.pause();
  }
});

progressBar.addEventListener("input", function () {
  audio.currentTime = (progressBar.value * audio.duration) / 100;
});

audio.addEventListener("playing", function () {
  setInterval(function () {
    if (isPlaying) {
      let audioDuration = `${Math.floor(audio.duration / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(audio.duration % 60)
        .toString()
        .padStart(2, "0")}`;
      let audioCurTime = `${Math.floor(audio.currentTime / 60)
        .toString()
        .padStart(2, "0")}:${Math.floor(audio.currentTime % 60)
        .toString()
        .padStart(2, "0")}`;
      timer.textContent = `${audioCurTime}/${audioDuration}`;
      progressBar.value = (audio.currentTime * 100) / audio.duration;
    }
  }, 1000);
});

volumeBar.addEventListener("input", function () {
  volume = volumeBar.value / 100;
  if (volume > 0 && volume < 0.3) {
    volumeIcon.src = "icons/volume-low.svg";
  } else if (volume > 0.3 && volume < 0.7) {
    volumeIcon.src = "icons/volume-medium.svg";
  } else if (volume > 0.7 && volume < 1) {
    volumeIcon.src = "icons/volume-max.svg";
  } else if (volume == 0) {
    volumeIcon.src = "icons/volume-none.svg";
  }
  audio.volume = volume;
});
for (let i = 0; i < 5; i++) {
  playbackSpeed[i].addEventListener("click", function () {
    audio.playbackRate = this.textContent.replace("x", "");
  });
}
fileSelector.addEventListener("change", function () {
  console.log(fileSelector.files.length);
});
