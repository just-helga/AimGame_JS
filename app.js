const startBtn = document.getElementById('start');
const screens = document.querySelectorAll('.screen');
const timeList = document.getElementById('time-list');
const timeElem = document.getElementById('time');
const board = document.getElementById('board');

const colors = [
    '#e74c3c', '#8e44ad', '#3498db', '#e67e22', '#2ecc71',
    '#d35400', '#1abc9c', '#f1c40f','#ff00ff', '#00ffff'
];
let time = 0;
let score = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
})

timeList.addEventListener('click', event => {
    if (event.target.classList.contains('time-btn')) {
        time = Number(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    }
})

board.addEventListener('click', event => {
    if (event.target.classList.contains('circle')) {
        score++;
        event.target.remove();
        createRandomCircle();
    }
})

function startGame() {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
}

function decreaseTime() {
    if (time === 0) {
        finishGame();
    } else {
        let current = --time;
        if (current < 10) {
            current = `0${current}`;
        }
        setTime(current);
    }
}

function setTime(value) {
    timeElem.innerHTML = `00:${value}`;
}

function createRandomCircle() {
    const circle = document.createElement('div');
    circle.classList.add('circle');

    const size = getRandomNumber(10, 60);
    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;

    const {width, height} = board.getBoundingClientRect();
    const x = getRandomNumber(0, width - size);
    const y = getRandomNumber(0, height - size);

    circle.style.top = `${y}px`;
    circle.style.left = `${x}px`;

    const color = getRandomColor();
    circle.style.backgroundColor = color;
    circle.style.boxShadow = `0 0 2px ${color}, 0 0 10px ${color}`;

    board.append(circle);
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function getRandomColor() {
    const index = Math.floor(Math.random() * colors.length);
    return colors[index];   
}

function finishGame() {
    timeElem.parentNode.classList.add('hide');
    board.innerHTML = `<h1>Cчет: <span class="primary">${score}</span> </h1>`
}