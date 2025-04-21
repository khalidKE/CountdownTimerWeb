const timeInput = document.getElementById('timeInput');
const setButton = document.getElementById('setButton');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const timerDisplay = document.getElementById('timer');

let totalSeconds = 0;
let intervalId = null;
let isPaused = false;

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateDisplay(seconds) {
    timerDisplay.textContent = formatTime(seconds);
    if (seconds < 10 && seconds > 0) {
        timerDisplay.classList.add('warning');
    } else {
        timerDisplay.classList.remove('warning');
    }
}

function startTimer() {
    if (totalSeconds <= 0) return;
    intervalId = setInterval(() => {
        if (!isPaused && totalSeconds > 0) {
            totalSeconds--;
            updateDisplay(totalSeconds);
            if (totalSeconds === 0) {
                clearInterval(intervalId);
                alert('Time is up!');
                resetTimer();
            }
        }
    }, 1000);
    startButton.disabled = true;
    pauseButton.disabled = false;
    resetButton.disabled = false;
}

function pauseTimer() {
    isPaused = !isPaused;
    pauseButton.textContent = isPaused ? 'Resume' : 'Pause';
}

function resetTimer() {
    clearInterval(intervalId);
    intervalId = null;
    isPaused = false;
    totalSeconds = 0;
    updateDisplay(totalSeconds);
    timeInput.value = '';
    startButton.disabled = false;
    pauseButton.disabled = true;
    pauseButton.textContent = 'Pause';
    resetButton.disabled = true;
    timerDisplay.classList.remove('warning');
}

setButton.addEventListener('click', () => {
    const input = timeInput.value;
    const regex = /^(\d{2}):(\d{2})$/;
    if (regex.test(input)) {
        const [, minutes, seconds] = input.match(regex);
        totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
        if (totalSeconds > 0) {
            updateDisplay(totalSeconds);
            startButton.disabled = false;
            resetButton.disabled = false;
        } else {
            alert('Please enter a valid time greater than 0.');
        }
    } else {
        alert('Please enter time in MM:SS format.');
    }
});

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

// Allow Enter key to trigger setButton
timeInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        setButton.click();
    }
});