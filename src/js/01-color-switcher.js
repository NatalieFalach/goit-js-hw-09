const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
startButton.addEventListener('click', onStartButtonClick);
stopButton.addEventListener('click', onStopButtonClick);

let intervalId = null;
stopButton.disabled = true;

function onStartButtonClick(e) {
  startButton.disabled = true;
  stopButton.disabled = false;
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopButtonClick(e) {
  clearInterval(intervalId);
  startButton.disabled = false;
  stopButton.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
