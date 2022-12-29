//счетчик символов в textarea
let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})



//console.log(+localStorage.getItem('index'))

document.addEventListener("DOMContentLoaded", () => {
    getRoadById(+localStorage.getItem('index'))
});

function getRoadById(id) {
    if (id !== -1) {
        console.log('yes')

        fetch(`https://api.trackingtravel.me/test-route/${id}`, {
        method: 'GET',
        })

        .then(response => response.json())

        .then(data => {
            console.log(data)

            let title = document.getElementById('title')
            title.value = data.title

            let description = document.getElementById('description')
            description.value = data.description

            let photo = document.getElementById('foto')
            //photo.value = data.photo
            data.photo.forEach(foto => {
                /* let url = foto.uri
                let nameFile =foto.name; */
                /* console.log(url, '   =   ', nameFile)
                const file = new File([url],nameFile)
                photo.files = file */



                // Создадим файл:
                let data = foto.uri;
                let file = new File([data], foto.name, {type: foto.type});

                // Создаем коллекцию файлов:
                let collection = new DataTransfer();
                collection.items.add(file);
                let file_list = collection.files;

                console.log('Коллекция файлов создана:');
                

                // Вставим созданную коллекцию в реальное поле:
                photo.files = file_list;
            })
            const fileList = photo.files;
            let preview = document.querySelector('.preview')
            let text = document.getElementById("foto-path")
            showFiles(fileList, preview, text)
            
            /* let mapPhoto = document.getElementById('map')
            mapPhoto.value = data.mapPhoto */

            let heightPeak = document.getElementById('peak')
            heightPeak.value = data.heightPeak

            let distanceRoute = document.getElementById('distance')
            distanceRoute.value = data.distanceRoute

            let durationRoute = document.getElementById('duration')
            durationRoute.value = data.durationRoute

            let linkToMap = document.getElementById('mapLink')
            linkToMap.value = data.linkToMap


            /* let result = document.querySelector('.result')
            result.innerHTML = ''
            setResult(data, result) */
        })

        .catch((error) => {
            /* let result = document.querySelector('.result')
            result.innerHTML = ''
            result.innerHTML = '<p>Ошибка. По выбранному id маршрут не найден</p>' */
            console.log(error)
        })
    }
}




//изменение цвета скрепки на кнопке при наведении курсора
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


//вывод имени выбранного файла
const foto = document.getElementById('foto')
let previews = document.querySelectorAll('.preview')

foto.addEventListener('change', (event) => {
    let preview = previews[0]
    
    const fileList = event.target.files;
    
    //document.getElementById("foto-path").textContent = files; 
    let text = document.getElementById("foto-path")
    showFiles(fileList, preview, text)
})


function showFiles(fileList, preview, text) {
    preview.innerHTML = ''
    
    let files = ''
    Array.from(fileList).forEach(file => {

        addPrviewFile(file, preview)
        
        files = files + file.name + ', '
    })

    text.textContent = files;
}


function addPrviewFile(file, preview) {
    let box = document.createElement("div");
    box.classList.add('box-foto')
    box.dataset.name = file.name

    let button = document.createElement("button");
    button.textContent = 'x'
    button.classList.add('box-button')
    button.addEventListener('click', deleteFotoBox)

    let img = document.createElement("img");
    img.classList.add('preview-foto')
    img.src = URL.createObjectURL(file)

    box.appendChild(img); 
    box.appendChild(button); 

    preview.appendChild(box); 
} 


function deleteFotoBox(event) {
    let item = event.target
    
    let parent = item.parentElement
    let name = parent.dataset.name

    let grandParent = parent.parentElement.parentElement
    let fotos = grandParent.querySelector('input')

    const fileList = fotos.files;
    let newFileList = new DataTransfer()
    Array.from(fileList).forEach(file => {
        if (file.name != name) {
            newFileList.items.add(file)
        } 
    })

    fotos.files = newFileList.files

    let preview = grandParent.querySelector('.preview')
    let text = grandParent.querySelector('span')
    
    showFiles(fotos.files, preview, text)
}



const map = document.getElementById('map')

map.addEventListener('change', (event) => {
    //const gpxfileList = this.files;
    console.log(map.value)
    //document.getElementById("map-path").textContent = map.value;
    let preview = previews[1]

    const fileList = event.target.files;
    
    let text = document.getElementById("map-path")

    showFiles(fileList, preview, text)
})





//отправка данных на сервер
let form = document.querySelector('.form')

form.addEventListener('submit', (event) => {
  event.preventDefault()

  let result = document.querySelector('.result')
  //result.innerHTML = ''

  /* function dataFtomForm(formNode) {
      return new FormData(formNode)
  } */

  let data = new FormData(form)
  let url = 'https://api.trackingtravel.me/test-route/create'
  let metod = 'POST'

  console.log(+localStorage.getItem('index'))
  if (+localStorage.getItem('index') !== -1) {
    url = `https://api.trackingtravel.me/test-route/${+localStorage.getItem('index')}`
    metod = 'PUT'
  }

  fetch(url, {
    method: metod,
    body: data
  })

  .then(function(response) {
    console.log(response.status )    //=> number 100–599

    localStorage.index = -1;
    
    if (response.status > 299) {
        let mistake = document.querySelector('.mistake')
        
        toggleChoiseField(mistake)
        setTimeout(() => {toggleChoiseField(mistake)}, 3000)
        return
    }
    //console.log('hello')
    //result.innerHTML = '<p>Маршрут записан в базу данных</p>'
    toggleChoiseField(result)
    addEvensForButtons(result)
    })
  
})


//вывод поля с кнопками после успешной отправки формы
function toggleChoiseField(field) {
    //let field = document.querySelector('.result')
    field.classList.toggle('view')
}

function addEvensForButtons(parent) {
    let goToMain = parent.querySelector('.return') 
    goToMain.addEventListener('click', () => {
        document.location='index.html'
    })

    let oneMore = parent.querySelector('.oneMore') 
    oneMore.addEventListener('click', () => {
        console.log('hello')
        clearForm(form)
        toggleChoiseField(document.querySelector('.result'))
    })
}

//очистка формы перед ее повторным заполнением
function clearForm(form) {
    const { elements } = form
    const data = Array.from(elements)
    .filter((item) => !!item.name)
    .forEach(element => {
      element.value = ''
    })

    document.getElementById("foto-path").textContent = '';
    document.getElementById("map-path").textContent = '';

    document.querySelectorAll('.preview').forEach(item => {
        item.innerHTML = '';
    })
}


//вернуться на главную
let btnMain = document.querySelector('.button-create')

btnMain.addEventListener('click', () => {
    document.location='index.html'
})

