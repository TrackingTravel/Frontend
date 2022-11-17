let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})


const btns = document.querySelectorAll('.button-foto')

btns.forEach(btn => {
    btn.addEventListener('mouseover', setHoverPicture)

    btn.addEventListener('mouseout', setUsualPicture)
    
    btn.addEventListener('click', addNewInput)
})



function setUsualPicture() {
  this.innerHTML = '<img src="plus.svg" alt="plus">'
}


function setHoverPicture() {
    this.innerHTML = '<img src="plus_hover.svg" alt="plus">'
}


/* function addNewInput() {
    let check = document.querySelectorAll('.file-path')
    if (check[check.length-1].value == '') return

    let file = document.querySelector('.file')

    removeButton(file)

    file.append(addNeighbour())
} */


function addNewInput() {
    let parent = this.parentElement
    
    let check = parent.querySelector('.file-path')
    if (check.value == '') return
  
    removeButton(parent)
    
    let text = parent.querySelector('input').getAttribute('placeholder')
    
    let file = document.querySelector('.file')
  
    file.append(addNeighbour(text))
}


/* function removeButton(parent) {
    let neighbours =  parent.querySelectorAll('.neighbour')
    let neighbour = neighbours[neighbours.length-1]
    neighbour.removeChild(neighbour.querySelector('button'))
} */


function removeButton(parent) {
    parent.removeChild(parent.querySelector('button'))
}


/* function addNeighbour() {
    let neighbour =  document.createElement('div')
    neighbour.classList.add('neighbour')
    neighbour.append(addInput())
    neighbour.append(addButton())
    return neighbour
} */
  

function addNeighbour(text) {
    let neighbour =  document.createElement('div')
    neighbour.classList.add('neighbour')
    neighbour.append(addInput(text))
    neighbour.append(addButton())
    return neighbour
}


/* function addInput() {
    let input = document.createElement('input')
    input.classList.add('input', 'file-path', 'neighbour-item')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Ссылка')
    return input
} */


function addInput(text) {
    let input = document.createElement('input')
    input.classList.add('input', 'file-path', 'neighbour-item')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', text)
    return input
}


function addButton() {
    let button = document.createElement('button')
    button.classList.add('button', 'button-foto')
    button.setAttribute('title', 'Добавить еще одно поле для ввода ссылки')
    button.innerHTML = '<img src="plus.svg" alt="plus">'

    button.addEventListener('mouseover', setHoverPicture)

    button.addEventListener('mouseout', setUsualPicture)

    button.addEventListener('click', addNewInput)

    return button
}


/* const gpx = document.getElementById('gpx')

gpx.addEventListener('change', () => {
    //const gpxfileList = this.files;
    console.log(gpx.value)
    document.getElementById("gpx-path").textContent = gpx.value;
}) */


/* const download = document.querySelector('.button-gpx')

download.addEventListener('mouseover', () => {
    download.innerHTML = '<img src="clip_hover.svg" alt="clip" class="clip"> Загрузить файл'
})


download.addEventListener('mouseout', () => {
    download.innerHTML = '<img src="clip.svg" alt="clip" class="clip"> Загрузить файл'
}) */

