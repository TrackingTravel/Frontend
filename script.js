let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})