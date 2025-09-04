const img = document.querySelector('.avatar');

img.addEventListener('click', () => {
    img.classList.add('backflip');

    img.addEventListener('animationend', () => {
        img.classList.remove('backflip');
    }, { once: true});
});