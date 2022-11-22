let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})


/* 
//кнопка с + и изменение картинки на ней
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
} */


/* 
    //обработка переноса кнопки +, когда она была одна
    function addNewInput() {
    let check = document.querySelectorAll('.file-path')
    if (check[check.length-1].value == '') return

    let file = document.querySelector('.file')

    removeButton(file)

    file.append(addNeighbour())
} 

function removeButton(parent) {
    let neighbours =  parent.querySelectorAll('.neighbour')
    let neighbour = neighbours[neighbours.length-1]
    neighbour.removeChild(neighbour.querySelector('button'))
}

function addNeighbour() {
    let neighbour =  document.createElement('div')
    neighbour.classList.add('neighbour')
    neighbour.append(addInput())
    neighbour.append(addButton())
    return neighbour
}


function addInput() {
    let input = document.createElement('input')
    input.classList.add('input', 'file-path', 'neighbour-item')
    input.setAttribute('type', 'text')
    input.setAttribute('placeholder', 'Ссылка')
    return input
} 

*/

/* 
//обработка переноса кнопки + когда их много
function addNewInput() {
    let parent = this.parentElement
    
    let check = parent.querySelector('.file-path')
    if (check.value == '') return
  
    removeButton(parent)
    
    let text = parent.querySelector('input').getAttribute('placeholder')
    
    let file = document.querySelector('.file')
  
    file.append(addNeighbour(text))
}


function removeButton(parent) {
    parent.removeChild(parent.querySelector('button'))
}
  

function addNeighbour(text) {
    let neighbour =  document.createElement('div')
    neighbour.classList.add('neighbour')
    neighbour.append(addInput(text))
    neighbour.append(addButton())
    return neighbour
}


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
 */


const buttonFoto = document.querySelector('.button-foto')

buttonFoto.addEventListener('mouseover', setClipWhite)

buttonFoto.addEventListener('mouseout', setClipGreen)


const buttonMap = document.querySelector('.button-map')

buttonMap.addEventListener('mouseover', setClipWhite)

buttonMap.addEventListener('mouseout', setClipGreen)


function setClipWhite() {
    this.innerHTML = '<img src="clip_hover.svg" alt="clip" class="clip"> Загрузить файл'
}

function setClipGreen() {
    this.innerHTML = '<img src="clip.svg" alt="clip" class="clip"> Загрузить файл'
}


const foto = document.getElementById('foto')

foto.addEventListener('change', () => {
    //const gpxfileList = this.files;
    console.log(foto.value)
    document.getElementById("foto-path").textContent = foto.value;
})



const map = document.getElementById('map')

map.addEventListener('change', () => {
    //const gpxfileList = this.files;
    console.log(map.value)
    document.getElementById("map-path").textContent = map.value;
})