let counter = document.querySelector('.counter');
let description = document.querySelector('.input-description');

description.addEventListener('input', () => {
    counter.textContent = description.textLength
})


const file = document.getElementById('file')

file.addEventListener('change', () => {
const fileList = this.files;
    console.log(file.value)
    document.getElementById("file-path").value = file.value;

})

const gpx = document.getElementById('gpx')

gpx.addEventListener('change', () => {
const gpxfileList = this.files;
    console.log(gpx.value)
    document.getElementById("gpx-path").textContent = gpx.value;

})
