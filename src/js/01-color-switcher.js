const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timer = null;


startBtn.addEventListener('click', onClickStartBtn);
stopBtn.addEventListener('click', onClickStopBtn);


function onClickStartBtn() {

timer = setInterval(getBgColor, 1000);
 startBtn.toggleAttribute('disabled');
};


function onClickStopBtn() {

  clearInterval(timer);
  startBtn.removeAttribute('disabled');
};

function getBgColor() {

 let colors = getRandomHexColor();
 document.body.style.backgroundColor = colors;
};

function getRandomHexColor() {

  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
};