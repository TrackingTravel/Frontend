let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})


const btn = document.querySelector('.button-foto')

btn.addEventListener('mouseover', () => {
    btn.innerHTML = '<img src="plus_hover.svg" alt="plus">'
})


btn.addEventListener('mouseout', () => {
    btn.innerHTML = '<img src="plus.svg" alt="plus">'
})


btn.addEventListener('click', () => {
    let check = document.querySelectorAll('.file-path')
    if (check[check.length-1].value == '') return

    let file = document.querySelector('.file')

    let input = document.createElement('input')
    input.classList.add('input', 'file-path')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Ссылка')
    /* input.title = 'tut' */

    file.append(input)
})


/* const file = document.getElementById('file')

file.addEventListener('change', () => {
const fileList = this.files;
    console.log(file.value)
    document.getElementById("file-path").value = file.value;

}) */

const gpx = document.getElementById('gpx')

gpx.addEventListener('change', () => {
    //const gpxfileList = this.files;
    console.log(gpx.value)
    document.getElementById("gpx-path").textContent = gpx.value;
})


const download = document.querySelector('.button-gpx')

download.addEventListener('mouseover', () => {
    download.innerHTML = '<img src="clip_hover.svg" alt="clip" class="clip"> Загрузить файл'
})


download.addEventListener('mouseout', () => {
    download.innerHTML = '<img src="clip.svg" alt="clip" class="clip"> Загрузить файл'
})

