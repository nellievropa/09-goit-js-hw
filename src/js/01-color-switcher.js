
import throttle from "lodash.throttle";

const CHANGE_COLOR = 500;

const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]')

let TIMER_Id = null;
// let startBtn.disabled = false;

startBtn.addEventListener('click', throttle(onStart, 500));
stopBtn.addEventListener('click', onStop);


function onStart(evt) {
  if (!evt) {
       return;
  }
        console.log('Змінюємо колір!');
        TIMER_Id = setInterval(changeColors,CHANGE_COLOR);
        startBtn.disabled = true;
 }
    

function onStop() {
   
    console.log('Зупиняємо інтервал!');
    clearInterval(TIMER_Id);  
    startBtn.disabled = false;
      

}

function changeColors() {
    console.log('Змінюємо колір!');
    document.body.style.background = getRandomHexColor();
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }