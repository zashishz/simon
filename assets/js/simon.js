let blocks = Array.from(document.querySelectorAll('.block'));

blocks.forEach((block) => {
    block.addEventListener('click', (event) => {
        console.log(event.target.className);
    });
});

