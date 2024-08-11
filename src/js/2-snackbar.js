'use strict'

// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const formEl = document.querySelector('.form');

const onFormSbmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const delayValue = formData.get('delay');
    const selectedState = formData.get('state');

    const executor = (resolve, reject) => {
        setTimeout(() => {
            const isFulfilled = selectedState === 'fulfilled';
            if (isFulfilled) {
                resolve(`✅ Fulfilled promise in ${delayValue}ms`);
            } else {
                reject(`❌ Rejected promise in ${delayValue}ms`)
            }
        },delayValue)
       
     };
    const promise = new Promise(executor);

    promise.then(
        (result) => {
            iziToast.info({
                position: 'topRight',
                icon: '',
                color: 'green',
                message: result,
            });
        },
        (err) => {
            iziToast.info({
                position: 'topRight',
                icon: '',
                color: 'red',
                message: err,
            });
        }
    );

    formEl.reset();
    
}

formEl.addEventListener('submit', onFormSbmit);