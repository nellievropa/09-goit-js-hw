import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formFild: document.querySelector('.form'),
  createPromiseBtn: document.querySelector('button[type="submit"]'),
  firstDelayField: document.querySelector('.js-delay'),
  delayStepField: document.querySelector('.js-step'),
  amountField: document.querySelector('.js-number'),
}


refs.formFild.addEventListener('submit', onRun)

function onRun(event) {
 event.preventDefault()
let delay = Number(refs.firstDelayField.value);
let step = Number(refs.delayStepField.value);
let amount = Number(refs.amountField.value);
console.log(amount)
console.log(delay)
console.log(step)

if (delay <= 0 || step < 0 || amount < 0) {
  Notify.warning('Fulfilled fields!')
}

 for (let i = 0; i <= amount - 1; i += 1) {
  
  createPromise(i, delay + step * i)
  .then(({position, delay}) => {
   
    Notify.success(`✅ Fulfilled promise ${position + 1} in ${delay}ms`);
   
  })
  .catch(({position, delay}) => {
   
    Notify.failure(`❌ Rejected promise ${position + 1} in ${delay}ms`)
   
  })
 }
 event.currentTarget.reset();
};

function createPromise(position, delay) {
  return new Promise ((res, rej) => {
    const shouldResolve = Math.random() > 0.3;

setTimeout(() => {
  if (shouldResolve) {
    res({position, delay});
  } else {
    rej({position, delay});
  }
}, delay)
  });

}
