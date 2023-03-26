let countdown;//для исп в if из setInterval

const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');
const alarm = document.querySelector('.alarm');

function timer(seconds) {
    //очистить ранее запущенные таймеры
    clearInterval(countdown);

    const now = Date.now();//текущая метка времени
    const then = now + seconds * 1000;//будущая метка времени
    // console.log({now, then});
    displayTimeLeft(seconds);//запускает ф и обновляет время в инстервале
    displayEndTime(then);//один раз показать время окончания(без обновлений в интервале)

    countdown = setInterval(() => {
        const secondsLeft = Math.round((then - Date.now()) / 1000);
        //проверить, следует ли его останавливать:
        if (secondsLeft < 0) {
            clearInterval(countdown);
            return;
        }
        displayTimeLeft(secondsLeft);
    }, 1000);
}

//вспомогательная ф, которая показывает первую секунду перед стартом setInterval
function displayTimeLeft(seconds) {
    //преобразование оставшегося времени в мин и сек:
    const minutes = Math.floor(seconds / 60);
    const remainderSeconds = seconds % 60;
    // console.log({ minutes, remainderSeconds });
    //отображает время + дописывает 0, если < 10
    const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
    document.title = display;//во вкладку
    timerDisplay.textContent = display;//на дисплей
}

//ф отображения времени окончания
function displayEndTime(timestamp) {
    const end = new Date(timestamp);//текущий момент
    const hour = end.getHours();
    const minutes = end.getMinutes();
    endTime.textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

//запускаем таймер по кнопке
function startTimer() {
    // console.log(this);
    const seconds = parseInt(this.dataset.time);
    // console.log(seconds);
    timer(seconds);
}

//слушаем клики по кнопкам
buttons.forEach(button => button.addEventListener('click', startTimer));
//слушаем форму ввода
document.customForm.addEventListener('submit', function (e) {
    e.preventDefault();//отменяем перезагрузку страницы
    const mins = this.minutes.value;
    // console.log(mins);
    timer(mins * 60);
    this.reset();//очистит поле ввода
})