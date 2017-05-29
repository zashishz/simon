let computerMoves = [];
let userMoves = [];

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

blocks.forEach(block => {
    block.addEventListener('transitionend', e => removeTransition(e));
    block.addEventListener('click', function () {
        playSound(this.classList[1]);
        userMoves.push(this.classList[1]);
        //validate
        let validationStatus = validateMoves();
        if (validationStatus) {
            setTimeout(computerTurn, 1000);
        } else if(validationStatus == 'over'){
            alert('game over');
        }
        console.log("userMoves", userMoves);
    });
});

function getRandomBlock() {
    let randomBlock = Math.floor(Math.random() * 4) + 1;
    return 'block' + randomBlock;
}

//console.log(randomBlock);
// setTimeout(playSound, 1000, randomBlock);

function computerTurn() {
    // push a random block in Array
    computerMoves.push(getRandomBlock());

    // play playSound
    for (let i = 0; i < computerMoves.length; i++) {
        setTimeout(() => {
            playSound(computerMoves[i]);
        }, i * 1000);
    }
    // get user input
    console.log("computerMoves", computerMoves);
    //reset user moves
    userMoves = [];
    // check if pattern is correct
    // repeat;
}
computerTurn();

//check if user and computers input ae in sync
function validateMoves() {
    if (computerMoves.length == userMoves.length) {
        for (let i = 0; i < computerMoves.length; i++) {
            if (computerMoves[i] != userMoves[i]) return 'over';
        }
        return true;
    }
    return false;
}

