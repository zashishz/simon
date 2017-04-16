function playSound(currentBlock) {
    let audio = document.querySelector(`audio[data-block="${currentBlock}"]`);
    let block = document.querySelector('.' + currentBlock);

    block.classList.add('playing');
    audio.play();
}

function removeTransition(event) {
    console.log(event);
    if (event.propertyName !== 'transform') return;
    event.target.classList.remove('playing');
}

let blocks = document.querySelectorAll('.block');

blocks.forEach(block => {
    block.addEventListener('transitionend', e => removeTransition(e));
    block.addEventListener('click',  (e) => playSound(e.target.classList[1]));
});

let randomBlock = Math.floor(Math.random() * 4) + 1;
randomBlock = 'block' + randomBlock;

//console.log(randomBlock);
// setTimeout(playSound, 1000, randomBlock);