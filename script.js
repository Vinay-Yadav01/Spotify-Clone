const hamburger = document.querySelector(".hamburger");
const left = document.querySelector(".left");
let flag = true;
hamburger.addEventListener("click", () => {
  if (flag) {
    left.style.left = "0";
    flag = false;
  } else {
    left.style.left = "-100%";
    flag = true;
  }
});

const close = document.querySelector(".close");
close.addEventListener("click", () => {
  left.style.left = "-100%";
  flag = true;
});

/*Functionality for the music player*/
let currentSong = new Audio();

async function getSongs() {
  const response = await fetch("http://127.0.0.1:3000/songs");
  const data = await response.text();
  let div = document.createElement("div");
  div.innerHTML = data;
  let as = div.getElementsByTagName("a");
  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.includes(".mp3")) {
      songs.push(element.href.split("/songs/")[1]);
    }
  }
  return songs;
}

const playMusic = async (song) => {
  let play = document.getElementById("play");

  console.log(playPlaylist);
  if (currentSong.paused) {
    currentSong = new Audio("songs/" + song);
    currentSong.play();
    play.src = "assests/svgs/pause.svg";
  } else {
    currentSong.pause();
    play.src = "assests/svgs/play.svg";
  }

  document.querySelector(".song-info").innerHTML = "hello";
  document.querySelector("#currentTime").innerHTML = "4:45";
  document.querySelector("#totalTime").innerHTML = "14:45";
};

async function main() {
  //Get the list of all songs
  let songs = await getSongs();
  //Show all the song in playlist
  let songlist = document.querySelector(".songs").getElementsByTagName("ul")[0];
  for (const song of songs) {
    songlist.innerHTML =
      songlist.innerHTML +
      `
    <li>
      <img class="play-pause"  width="20" height="20" src="assests/svgs/music.svg" alt="" />
      <div class="info">
        <div>${song.replaceAll("%20", " ")}</div>
        <div>Artist</div>
      </div>
      <img src="assests/svgs/play.svg" alt="">
    </li>`;
  }

  //Attach a event listener to all the songs
  Array.from(document.querySelectorAll(".songs li")).forEach((e) => {
    e.addEventListener("click", () => {
      playMusic(
        e.getElementsByTagName("div")[0].firstElementChild.innerHTML.trim()
      );
    });
  });

  //Attach a event listener to the play, next and prev button
  let play = document.getElementById("play");

  play.addEventListener("click", (element) => {
    if (currentSong.paused) {
      currentSong.play();
      element.target.src = "assests/svgs/pause.svg";
    } else {
      currentSong.pause();
      element.target.src = "assests/svgs/play.svg";
    }
  });
}

main();

let volume = document.querySelector("#volume-slider");

volume.addEventListener("change", (e) => {
  currentSong.volume = parseInt(e.target.value) / 100;
});
