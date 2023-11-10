import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import { Report } from 'notiflix/build/notiflix-report-aio';


const refs = {
   
    startBtn: document.querySelector('button[data-start]'),
    // datePicker: document.querySelector('#datetime-picker'),
    daysValue: document.querySelector('span[data-days]'),
    hoursValue: document.querySelector('span[data-hours]'),
    minsValue: document.querySelector('span[data-minutes]'),
    secsValue: document.querySelector('span[data-seconds]'),
}

const Calendars = flatpickr("input#datetime-picker", 

 {
        enableTime: true,
        time_24hr: true,
        defaultDate: new Date(),
        minuteIncrement: 1,
        onClose(selectedDates) {
          console.log(selectedDates[0]);
     
        },
      }
    
);

const timer = {
    intervalId: null,
   
    start() {
       
        refs.startBtn.isActive = false;
        // дата від якої рахуємо відлік
        const targetDate = new Date(Calendars.selectedDates[0]);
        // console.log(targetDate);
  //   переводимо  її в мілісекунди 
    const reversDate = new Date(targetDate).getTime();
    const currentDate = new Date().getTime();
    // console.log(reversDate);
    // console.log(currentDate);

    if (reversDate < currentDate) {
        refs.startBtn.isActive = false;
        // alert("Please choose a date in the future");
        // Report.failure(
        //     'You chose a wrong date!',
        //     'Please try again and select the correct date <br/><br/>- Будь ласка, спробуйте ще та виберіть дату знову',
        //     'Close  / Закрити',
        //     );
            Report.warning(
                'You chose a wrong date!',
                'Please try again <br/><br/>- select the correct date',
                'Okay',
                () => {
                    alert(' Будь ласка, спробуйте ще та виберіть дату знову');
                    },
                );

        return;
    }

    let deltaTime = 0;
    const intervalId = setInterval(() => {
    const currentDate = new Date().getTime();

    refs.startBtn.isActive = true;
    deltaTime = reversDate - currentDate;
    // console.log(deltaTime);
    
    if (deltaTime <= 0) {
        clearInterval(intervalId);
        Report.info(
            'Time "X" has come',
            'And we can move forward! <br/><br/>- NeBa',
            'Okay',
            );
        console.log(`Interval with id ${intervalId} has stopped!`);
        return;

    }
    // const { days, hours, minutes, seconds } = convertMs(deltaTime);
    // деструктуризацію змінюємо на змінну time
    const time = convertMs(deltaTime);
    // console.log(time)
    // і викликаємо функцію updateClockFace
    addLeadingZero(time);

}, 1000);
    },

};

refs.startBtn.addEventListener('click', () => {
    timer.start();
});


function addLeadingZero ({days, hours, minutes, seconds}) {
    refs.daysValue.textContent = `${pad(days)}`;
    refs.hoursValue.textContent = `${pad(hours)}`;
    refs.minsValue.textContent = `${pad(minutes)}`;
    refs.secsValue.textContent = `${pad(seconds)}`;

}

//  для того, щоб зробити числа завжди двозначними (01 або 25) використовуємо метод pad
// ми в нього обернемо наші значення hours, mins, secs
function pad(value) {
    // цей запис означає : візьми число, зроби з нього строку і на старті(ЗЛІВА!!) додай '0'
    return String(value).padStart(2, '0');
};


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    // const days = pad(Math.floor(ms / day));
    const days = Math.floor(ms / day);
    // Remaining hours
    // const hours = pad(Math.floor((ms % day) / hour));
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    // const minutes = pad(Math.floor(((ms % day) % hour) / minute));
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    // const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  };
