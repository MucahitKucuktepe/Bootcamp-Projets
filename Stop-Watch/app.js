const timeDisplay = document.getElementById("timeDisplay");
const playBtn = document.getElementById("play");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");

let startTime = 0;
let elapsedTime = 0;
let currentTime = 0;
let paused = true;
let intervalId;
let hrs = 0;
let mins = 0;
let secs = 0;

playBtn.addEventListener("click", (e) => {
  if (paused) {
    paused = false;
    startTime = Date.now() - elapsedTime;
    intervalId = setInterval(updateTime, 1000);
    playBtn.classList = "fa-solid fa-pause";
  } else {
    if (!(playBtn.classList.contains("fa-solid fa-pause"))) {
      paused = true;
      elapsedTime = Date.now() - startTime;
      clearInterval(intervalId);
      playBtn.classList = "fa-solid fa-play";
    }
  }
});

resetBtn.addEventListener("click", (e) => {
  paused = true;
  clearInterval(intervalId);
  startTime = 0;
  elapsedTime = 0;
  currentTime = 0;
  hrs = 0;
  mins = 0;
  secs = 0;
  timeDisplay.textContent = "00:00:00";
});

const updateTime = () => {
  elapsedTime = Date.now() - startTime;
  console.log(elapsedTime);
  secs = Math.floor((elapsedTime / 1000) % 60);
  mins = Math.floor((elapsedTime / (1000 * 60)) % 60);
  hrs = Math.floor((elapsedTime / (1000 * 60 * 60)) % 60);
  const zeroAdd = (timePart) => {
    return ("0" + timePart).length > 2 ? timePart : "0" + timePart;
  };
  secs = zeroAdd(secs);
  mins = zeroAdd(mins);
  hrs = zeroAdd(hrs);
  timeDisplay.textContent = `${hrs}:${mins}:${secs}`;
};
