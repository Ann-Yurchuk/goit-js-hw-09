import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';

let getRef = selector => document.querySelector(selector);
const input = getRef('#datetime-picker');
const startBtn = getRef('[data-start]');
const daysRef = getRef('[data-days]');
const hoursRef = getRef('[data-hours]');
const minutesRef = getRef('[data-minutes]');
const secondsRef = getRef('[data-seconds]');
let intervalId = null;

startBtn.toggleAttribute('disabled');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      startBtn.toggleAttribute('disabled');
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled');
      
    }
  },
};

flatpickr(input, options);
 

startBtn.addEventListener("click", onClickStartBtn);

function onClickStartBtn() {
 
  intervalId = setInterval(() => {
  const dataEnd = new Date('2022-11-2 00:00:00');
  const dataNow = new Date();
  const data = dataEnd - dataNow;
      
  const result = convertMs(data);
   
if (data < 1000) {
  clearInterval(intervalId);
  }   
    }, 1000);  

  }

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = addLeadingZero(Math.floor(ms / day));
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  daysRef.textContent = days;
  hoursRef.textContent = hours;
  minutesRef.textContent = minutes;
  secondsRef.textContent = seconds;

  return { days, hours, minutes, seconds };
}
  
 
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}


