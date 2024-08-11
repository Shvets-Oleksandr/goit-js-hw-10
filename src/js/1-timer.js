'use strict'

// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";


const inputEl = document.querySelector('#datetime-picker');
const btnStartEl = document.querySelector('button[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = '';
btnStartEl.disabled = true;


flatpickr(inputEl, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        const now = new Date();
        if (selectedDates[0] < now) {
            iziToast.error({
                position: 'topRight',
                title: 'Error',
                message: 'Please choose a date in the future',
            });
            btnStartEl.disabled = true;
        } else {
            userSelectedDate = selectedDates[0];
            btnStartEl.disabled = false;
            console.log(userSelectedDate);
        }
  }
});

const onStartClick = () => {
    btnStartEl.disabled = true;
    inputEl.disabled = true;
    
    const intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate.getTime() - currentTime;

        if (deltaTime <= 0) {
            clearInterval(intervalId);
            inputEl.disabled = false;
            updateTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });
            return;
        }

        const timeConvert = convertMs(deltaTime);
        updateTimer(timeConvert);

    }, 1000);

};

btnStartEl.addEventListener('click', onStartClick);


function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
    return String(value).padStart(2, "0");
}

function updateTimer(object) {
  daysEl.textContent = object.days;
  hoursEl.textContent = object.hours;
  minutesEl.textContent = object.minutes;
  secondsEl.textContent = object.seconds;
}