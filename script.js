//счетчик символов в textarea
let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})


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
            counter.textContent = description.textLength
            
            let previews = document.querySelectorAll('.preview')         

            data.photo.forEach(foto => {             
                //Входные параметры:
                let input_element = document.getElementById('foto');
                let file_name = foto.name;
                let file_link = foto.uri;
                let preview = previews[0];
                let text = document.getElementById("foto-path");

                // Вызовем функцию для вставки файла:
                setFile(input_element, file_name, file_link, preview, text);
            })

            data.mapPhoto.forEach(foto => {
                //Входные параметры:
                let input_element = document.getElementById('map');
                let file_name = foto.name;
                let file_link = foto.uri;
                let preview = previews[1];
                let text = document.getElementById("map-path");

                // Вызовем функцию для вставки файла:
                setMapFile(input_element, file_name, file_link, preview, text);

                async function setMapFile(input, name, url, preview, text) {
                try {
                    let blob = await (await fetch(url)).blob();
                    const dt  = new DataTransfer();
                    dt.items.add(new File([blob], name, {type: blob.type}));
                    input.files = dt.files;
                    console.log('Файл успешно вставлен:');
                    console.dir(input.files);

                    
                    showFiles(input.files, preview, text)
                // return true;
                }
                catch(err) {
                    console.log('Ошибка при вставке файла:');
                    console.dir(err);
                // return false;
                }
                }
            })

            let heightPeak = document.getElementById('peak')
            heightPeak.value = data.heightPeak

            let distanceRoute = document.getElementById('distance')
            distanceRoute.value = data.distanceRoute

            let durationRoute = document.getElementById('duration')
            durationRoute.value = data.durationRoute

            let linkToMap = document.getElementById('mapLink')
            linkToMap.value = data.linkToMap
        })

        .catch((error) => {
            console.log(error)
        })
    }
}


const dt  = new DataTransfer();
async function setFile(input, name, url, preview, text) {
  try {
    let blob = await (await fetch(url)).blob();
    
    dt.items.add(new File([blob], name, {type: blob.type}));
    input.files = dt.files;
    console.log('Файл успешно вставлен:');
    console.dir(input.files);
    
    showFiles(input.files, preview, text)
   // return true;
  }
  catch(err) {
    console.log('Ошибка при вставке файла:');
    console.dir(err);
   // return false;
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
    //console.dir(fileList);
    //document.getElementById("foto-path").textContent = files; 
    let text = document.getElementById("foto-path")
    showFiles(fileList, preview, text)
})


function showFiles(fileList, preview, text) {
    preview.innerHTML = ''
    
    let files = ''
    Array.from(fileList).forEach(file => {

        addPrviewFile(file, preview)
       // debugger
        files = files + file.name + ', '
    })

    text.textContent = files;
}


function addPrviewFile(file, preview) {
    let box = document.createElement("div");
    box.classList.add('box-foto')
    box.dataset.name = file.name
//debugger
    let button = document.createElement("button");
    button.textContent = 'x'
    button.classList.add('box-button')
    button.addEventListener('click', deleteFotoBox)
//debugger
    let img = document.createElement("img");
    img.classList.add('preview-foto')
    img.src = URL.createObjectURL(file)
//debugger
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
    document.querySelector('.counter').textContent = '0';

    document.querySelectorAll('.preview').forEach(item => {
        item.innerHTML = '';
    })
}


//вернуться на главную
let btnMain = document.querySelector('.button-create')

btnMain.addEventListener('click', () => {
    document.location='index.html'
})

