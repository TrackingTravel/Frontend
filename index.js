let btnCreate = document.querySelector('.button-create')

btnCreate.addEventListener('click', () => {
  document.location='form.html'
})


document.addEventListener("DOMContentLoaded", getAllRoads);

function getAllRoads() {
  fetch('https://api.trackingtravel.me/test-routes', {
    method: 'GET',
    /* headers: { 'Content-Type': 'application/json' },
    credentials: "omit" */
  })

  .then(response => response.json())

  .then(data => {
    console.log(data)
    let main = document.querySelector('.main')
    //main.innerHTML = '';

    data.forEach(item => {
      createSection(main, item)
    })
  })

  .catch(() => {
    console.log('Ошибка')
  })
}


/* let btnGetAll = document.querySelector('.button-getAll')

btnGetAll.addEventListener('click', () => {
  
    
  fetch('https://api.trackingtravel.me/test-routes', {
    method: 'GET',
      
  })

  .then(response => response.json())

  .then(data => {
    console.log(data)
    let result = document.querySelector('.result')
    result.innerHTML = ''

    data.forEach(item => {
        setResult(item, result)
    })

  })

  .catch(() => {
    let result = document.querySelector('.result')
    result.innerHTML = ''
    result.innerHTML = '<p>Ошибка</p>'
  })

}) */

  

/* let btnGet = document.querySelector('.button-get')

btnGet.addEventListener('click', () => {
    //console.log('hi')
    let input = document.querySelector('.input-get')
    let inputValue = +input.value
    //console.log(inputValue + 1)

    fetch(`https://api.trackingtravel.me/test-route/${inputValue}`, {
      method: 'GET',
      //headers: { 'Content-Type': 'application/json' },
      //credentials: "omit" 
    })

    .then(response => response.json())

    .then(data => {
        //console.log(data)
        let result = document.querySelector('.result')
        result.innerHTML = ''
        setResult(data, result)
    })

    .catch((error) => {
      let result = document.querySelector('.result')
      result.innerHTML = ''
      result.innerHTML = '<p>Ошибка. По выбранному id маршрут не найден</p>'
      //console.log(error)
    })
}) */


/* let btnDel = document.querySelector('.button-del')

btnDel.addEventListener('click', () => {
  let result = document.querySelector('.result')
  result.innerHTML = ''
  


  let input = document.querySelector('.input-del')
    let inputValue = +input.value
    //console.log(inputValue + 1)

    fetch(`https://api.trackingtravel.me/test-route/${inputValue}`, {
      method: 'DELETE',
    })

    .then(response => {
      console.log(response.status)
      result.innerHTML = 'Маршрут удален'
    }) */

/*     .then(data => {
        //console.log(data)
        let result = document.querySelector('.result')
        result.innerHTML = 'ready'
        setResult(data, result)
    }) */

/*     .catch((error) => {
      let result = document.querySelector('.result')
      result.innerHTML = ''
      result.innerHTML = '<p>Ошибка. По выбранному id маршрут не найден</p>'
      //console.log(error)
    }) */

//})


/* function setResult(item, result) {
  let box = document.createElement('div')

  let id = document.createElement('p')
  id.textContent = 'id ' + item.id
  box.append(id)

  let country = document.createElement('p')
  country.textContent = 'country: ' + item.country.nameOfCountry
  box.append(country)

  let description = document.createElement('p')
  description.textContent = 'description: ' + item.description
  box.append(description)

  let distanceRoute = document.createElement('p')
  distanceRoute.textContent = 'distanceRoute: ' + item.distanceRoute
  box.append(distanceRoute)

  let durationRoute = document.createElement('p')
  durationRoute.textContent = 'durationRoute: ' + item.durationRoute
  box.append(durationRoute)

  let heightPeak = document.createElement('p')
  heightPeak.textContent = 'heightPeak: ' + item.heightPeak
  box.append(heightPeak)

  let linkToMap = document.createElement('p')
  linkToMap.textContent = 'linkToMap: ' + item.linkToMap
  box.append(linkToMap)

  let photo = document.createElement('p')
  photo.textContent = 'photo: ' 

  item.photo.forEach(foto => {
    photo.textContent += foto.name
    photo.textContent += ' , '
  })
  box.append(photo)

  let title = document.createElement('p')
  title.textContent = 'title: ' + item.title
  box.append(title)

  result.append(box)
  result.append(document.createElement('br'))
} */



function createSection(main, item) {
  let section = document.createElement('section');
  section.classList.add('container', 'section');
 // debugger
  section.append(createManagment(item));
  
  section.append(createTable(item));

  let titleArray = ['Description', 'Photo'];
  let valueArray = [item.description, item.photo];
  let lastTablePart = addTablePart(titleArray, valueArray);
  lastTablePart.classList.add('last')
  section.append(lastTablePart);

  main.append(section);
}


function createManagment(item) {
  let management = document.createElement('div');
  management.classList.add('management');

  management.append(createManagmentItem(item));
  management.append(addButtons(item.id))
  //console.log('hi')
  return management;
}


function createManagmentItem(item) {
  let managementItem = document.createElement('div');
  managementItem.classList.add('managmant-item');

  let paragraph = document.createElement('p');
  paragraph.classList.add('item-id');
  paragraph.innerHTML = `ID <span id="id">${item.id}</span>`;

  managementItem.append(paragraph);
  return managementItem;
}


function addButtons(index) {
  let div = document.createElement('div');
  div.classList.add('management-buttons-box')
  
  let edit = addButton(['buttons', 'buttons-edit'], "", "", index);
  div.append(edit);

  let del = addButton(['buttons', 'buttons-del'], "./icon/delete.svg", "delete", index);
  div.append(del);
  return div;
}


function addButton(classes, url, text, index) {
  let button = document.createElement('button');
  classes.forEach(clas => {
    button.classList.add(clas);
  })

  button.dataset.index = index;
  
  if (button.classList.contains('buttons-del')) {
    let img = document.createElement('img');
    img.src = url;
    img.alt = text;
    button.append(img);
  }

  button.addEventListener('click', (event) => {
    console.log('hello')
    let id = +event.currentTarget.dataset.index;
    if (button.classList.contains('buttons-del')) {
      removeRoad(event, id);
    }
    
  })
  return button;
}


function removeRoad(event, id) {
  let parent = event.currentTarget.parentElement.parentElement;

  let div = document.createElement('div');
  div.classList.add('removeInfo');
  div.textContent = 'Вы уверены что хотите удалить данный маршрут?';

  let box = document.createElement('div');
  box.classList.add('removeInfo-button-box');

  let buttonYes = document.createElement('button');
  buttonYes.classList.add('removeInfo-button');
  buttonYes.textContent = 'Удалить';
  buttonYes.addEventListener('click', (event) => {
    fetch(`https://api.trackingtravel.me/test-route/${id}`, {
      method: 'DELETE',
    })

    .then(response => {
      console.log(response.status);
      parent.innerHTML = 'Маршрут удален';
      setTimeout(() => {getAllRoads()}, 3000);
    })
  })
  box.append(buttonYes);

  let buttonNo = document.createElement('button');
  buttonNo.classList.add('removeInfo-button');
  buttonNo.textContent = 'Отмена';
  buttonNo.addEventListener('click', (event) => {
    let child = event.currentTarget.parentElement.parentElement;
    parent.removeChild(child);
  })
  box.append(buttonNo);
  
  div.append(box);
  parent.append(div);
}


function createTable(item) { 
  let table = document.createElement('div');
  table.classList.add('table');
  
  let titleArray = ['Title', 'Country', 'Link to Map'];
  let valueArray = [item.title, item.country.nameOfCountry, item.linkToMap];
  table.append(addTablePart(titleArray, valueArray));

  titleArray = ['Distance', 'Duration', 'Height Peak'];
  valueArray = [item.distanceRoute, item.durationRoute, item.heightPeak];
  table.append(addTablePart(titleArray, valueArray, 'width'));
  return table;
}


function addTablePart(titleArray, valueArray, newItemClass) {
  let tablePart = document.createElement('div');
  tablePart.classList.add('table-part');

  for (let i = 0; i < titleArray.length; i++) {
    tablePart.append(addTableItem(titleArray[i], valueArray[i], newItemClass));
  }

  return tablePart;
}


function addTableItem(title, text, newItemClass) {
  let div = document.createElement('div');
  div.classList.add('table-item');

  let itemName = document.createElement('div');
  itemName.classList.add('table-item-name');
  itemName.textContent = title;
  div.append(itemName);

  let itemValue = document.createElement('div');
  itemValue.classList.add('table-item-value');
  if (newItemClass) {
    itemValue.classList.add(newItemClass);
  }

  if (title === 'Link to Map') {
    let link = document.createElement('a');
    link.href = text
    link.target = '_blank';
    link.textContent = 'Link';
    itemValue.append(link);
  } else if (title === 'Photo') {
    text.forEach(foto => {
      let div = document.createElement('div');
      div.classList.add('photo')
      div.style.backgroundImage = `url(${foto.uri})`

      itemValue.append(div)
    })
  } else {
    itemValue.textContent = text;
  }
  
  div.append(itemValue);

  return div;
}