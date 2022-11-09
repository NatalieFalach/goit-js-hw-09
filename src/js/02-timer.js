import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');

const refs = {
  days: document.querySelector('span[data-days]'),
  hours: document.querySelector('span[data-hours]'),
  minutes: document.querySelector('span[data-minutes]'),
  seconds: document.querySelector('span[data-seconds]'),
};

startBtn.disabled = true;
let timeToEnd = null;
let userTime = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    const currentTime = Date.now();
    const userSelectedDateStr = selectedDates[0];
    const userDate = new Date(userSelectedDateStr);
    userTime = userDate.getTime();

    console.log(currentTime, userTime);
    if (userTime <= currentTime) {
      Notify.failure('Please choose a date in the future');
      return;
    }

    startBtn.disabled = false;
  },
};
const picker = flatpickr(inputEl, options);

startBtn.addEventListener('click', onStartBtnClick);

function onStartBtnClick(e) {
  const intervalId = setInterval(() => {
    const currentTime = Date.now();
    const resultTime = userTime - currentTime;
    const { days, hours, minutes, seconds } = convertMs(resultTime);

    refs.days.textContent = addLeadingZero(days);
    refs.hours.textContent = addLeadingZero(hours);
    refs.minutes.textContent = addLeadingZero(minutes);
    refs.seconds.textContent = addLeadingZero(seconds);

    if (days === 0 && hours === 0 && minutes === 0 && seconds === 0) {
      clearInterval(intervalId);
    }
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
