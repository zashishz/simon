let computerMoves = [];
let userMoves = [];
let gameMode = false;
let startBtnClicked = false;
let strictMode = false;
let timeouts = [];
let intervals = [];

function playSound(currentBlock) {
    let audio = document.querySelector(`audio[data-block="${currentBlock}"]`);
    let block = document.querySelector('.' + currentBlock);

    block.classList.add('playing');
    audio.play();
}

function removeTransition(event) {
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing');
}

let blocks = document.querySelectorAll('.block');

//Activate only if Game Mode ON


blocks.forEach(block => {
    block.addEventListener('transitionend', e => removeTransition(e));
    block.addEventListener('click', function () {
        clearAllIntervals();
        if (gameMode && startBtnClicked) {
            intervals.push(setInterval(triggerError,(1000*computerMoves.length) + 5000));
            userMoves.push(this.classList[1]);
            console.log("userMoves", userMoves);
            //validate
            let validationStatus = validateMoves();
            if (validationStatus) {
                playSound(this.classList[1]);
                if (computerMoves.length == userMoves.length) {
                    timeouts = [];
                    console.log('reset');
                    clearAllIntervals();
                    setTimeout(computerTurn, 1000);
                }
            } else if(!strictMode) {
                //repeat same move  try again
                userMoves = [];
                console.log('try again');
                triggerError();
            } else {
                //alert('game over');
                //reste Game
                // setTimeout(reset, 1000);
                triggerError();
                // gameMode = false;
                console.error("Game Over - Press start to play again.");
                //setTimeout(computerTurn, 1000);
            }
        }
    });
});

function reset() {
    userMoves = [];
    computerMoves = [];
    document.getElementById('counter').textContent = 0;
    clearAllIntervals();
    // startBtnClicked = false;
}

function clearAllIntervals() {
    intervals.forEach((interval) => clearInterval(interval));
    intervals = [];
}

function clearAllTimeouts() {
    timeouts.forEach((timeout) => clearTimeout(timeout));
    timeouts = [];
}

function getRandomBlock() {
    let randomBlock = Math.floor(Math.random() * 4) + 1;
    return 'block' + randomBlock;
}

//console.log(randomBlock);
// setTimeout(playSound, 1000, randomBlock);

function computerTurn() {

    // push a random block in Array
    computerMoves.push(getRandomBlock());

    play(computerMoves);
    // get user input
    console.log("computerMoves", computerMoves);
    //reset user moves
    userMoves = [];
    document.getElementById('counter').textContent = computerMoves.length;
    intervals.push(setInterval(triggerError,(1000*computerMoves.length) + 5000));
    // check if pattern is correct
    // repeat;
}

function triggerError() {
    let errorAudio = document.querySelector(`audio[data-block="error"]`);
    errorAudio.play();
    userMoves = [];
    clearAllTimeouts();
    if(!strictMode) { 
        setTimeout(play,1000,computerMoves); 
    }
    else { 
        reset(); 
        setTimeout(computerTurn,1000); 
    }
}

function play(moves) {
    // play playSound
    for (let i = 0; i < moves.length; i++) {
        timeouts.push(setTimeout(() => {
            playSound(moves[i]);
        }, i * 1000));
    }
}

let slider = document.querySelector('.slider-control');
let switchBtn = document.querySelector('.switch');

slider.addEventListener('click', () => {
    gameMode = (gameMode == true) ? false : true;
    if (gameMode) {
        //move slider to right
        switchBtn.classList.add('slider-play-on');
    } else {
        //move slider back to left
        clearAllTimeouts();
        switchBtn.classList.remove('slider-play-on');
        strictBulb.classList.remove('strict-bulb-on');
        startBtnClicked = false;
        reset();
    }
})

let startBtn = document.getElementById('start-btn');
startBtn.addEventListener('click', () => {
    if (gameMode && !startBtnClicked) {
        startBtnClicked = true;
        setTimeout(computerTurn, 1000);
    }
});

let strictBtn = document.getElementById('strict-btn');
let strictBulb = document.querySelector('.strict-bulb');
strictBtn.addEventListener('click', () => {
    if (gameMode) {
        if (strictBulb.classList.contains('strict-bulb-on')) {
            strictBulb.classList.remove('strict-bulb-on');
            strictMode = false;
        } else {
            strictBulb.classList.add('strict-bulb-on');
            strictMode = true;
        }
    }
});

//check if user and computers input ae in sync
function validateMoves() {
    for (let i = 0; i < userMoves.length; i++) {
        if (computerMoves[i] != userMoves[i]) return false;
    }
    return true;
}

