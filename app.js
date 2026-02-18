const bells = new Audio('./sounds/mixkit-bike-magical-bell-591.wav');
const playlist = [ './sounds/Song_1.mp3', 
                  './sounds/Song_2.mp3', 
                  './sounds/Song_3.mp3', 
                  './sounds/Song_4.mp3', 
                  './sounds/Song_5.mp3'
];
const startBtn = document.querySelector('.btn-start');
const pauseBtn = document.querySelector('.btn-pause');
const resetBtn = document.querySelector('.btn-reset');
const session = document.querySelector('.minutes');
const DEFAULT_SESSION_MINUTES = 60;

let trackIndex = 0;
const player = new Audio(playlist[trackIndex]);
player.loop = false;

let isPaused = false;
let initialSeconds;

let myInterval;
let state = true;
let totalSeconds; 

player.addEventListener('ended', () => {
    trackIndex = (trackIndex + 1) % playlist.length;
    player.src = playlist[trackIndex];
    player.play();
});

const updateSeconds = () => {
    if (!isPaused && totalSeconds>0){
    totalSeconds--;

    const minutesLeft = Math.floor(totalSeconds / 60);
    const secondsLeft = totalSeconds % 60;

    session.textContent = `${minutesLeft}`;
    document.querySelector('.seconds').textContent = secondsLeft<10 ? `0${secondsLeft}` : `${secondsLeft}`;

    if(totalSeconds === 0){
        bells.play();
        player.pause();
        player.currentTime = 0;
        trackIndex = 0;
        player.src = playlist[0];
        
        clearInterval(myInterval);
        state = true;
            }
        }
    };

const appTimer = () => {
    if (state) {
        state = false;
        const sessionAmount = parseInt(session.textContent); // parse session time from DOM
        totalSeconds = sessionAmount * 60;
        initialSeconds = totalSeconds;
        myInterval = setInterval(updateSeconds, 1000);

        player.play();
        
    } else {
        alert('Session has already started.');
    }
};

const pauseTimer = () =>{
    if(!state){
        isPaused = !isPaused;
        pauseBtn.textContent=isPaused ? 'Resume' : 'Pause';

        if (isPaused){
            player.pause();
        } else {
            player.play();
        }
    }
}

const resetTimer = () => {
    clearInterval(myInterval);
    totalSeconds = DEFAULT_SESSION_MINUTES * 60;

    const minutesLeft = DEFAULT_SESSION_MINUTES;
    const secondsLeft = 0;

    session.textContent = `${minutesLeft}`;
    document.querySelector('.seconds').textContent = '00';

    state = true;
    isPaused = false;
    pauseBtn.textContent = 'Pause';

    player.pause();
    player.currentTime = 0;
    trackIndex = 0;
    player.src = playlist[0];
};



startBtn.addEventListener('click', appTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);
