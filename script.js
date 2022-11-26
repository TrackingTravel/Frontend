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


/* let form = document.querySelector('.form')
form.action = 'http://trackingtravel.me:8080/api/test-routes/create';
form.method = 'POST'; */

function serializeForm(formNode) {
  const { elements } = formNode
  /* const data = Array.from(elements)
    .filter((item) => !!item.name)
    .map((element) => {
      const { name, value } = element

      return { name, value }
    })
 */
let data = {}
  Array.from(elements)
      .forEach((element) => {
       // let obj
        const { name, value } = element
        if (name == '') return
        data[name] = value
        //console.log({ name, value })
       // obj['name'] = name
       // obj.value = value
       // data[name] = obj
      })

      return data

  //console.log('func', data)
}

let form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
    event.preventDefault()
    let data = serializeForm(form)
    /* event.action = 'http://trackingtravel.me:8080/api/test-routes/create';
    event.method = 'POST' */

    console.log(data)

    /* let user = {
      title: 'John',
      description: 'Smith',
      mapLink:'li',
      mapPhoto: '/swagger.jpg',
      photo: '/swagger.jpg',
      peak: '1',
      distance: '2',
      duration: '3',
      photo: '/swagger.jpg',
    }; */

      fetch(`http://trackingtravel.me:8080/api/test-routes/create`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      /* credentials: "omit" */
      body: JSON.stringify(data)
    })

    

    .then(function(response) {
      console.log(response.status )    //=> number 100–599
      //console.log(response.statusText) //=> String
      //console.log(response.headers   ) //=> Headers
      //console.log(response.url  )      //=> String
      if (response.status != 200) {
        console.log('what')
        let result = document.querySelector('.result')
        result.innerHTML = ''
        result.innerHTML = '<p>Ошибка отправления</p>'
        
      }
      console.log('хорошо')
        return response.json()
      })

     .then(data => {
        console.log(data)
        //console.log('tut')
    })

  /*  .catch((error) => {  
      console.log(error)
    })  */
    
})