/* Global Variables */

function getTimeStamp() {
    const now = new Date();
    return ((now.getDate()) + '/' + (now.getMonth() + 1) + '/' +
        now.getFullYear() + " " +
        now.getHours() + ':' +
        ((now.getMinutes() < 10)
            ? ("0" + now.getMinutes())
            : (now.getMinutes())) + ':' +
        ((now.getSeconds() < 10)
            ? ("0" + now.getSeconds())
            : (now.getSeconds())));
}

const weatherForm = document.querySelector('form')
const search = document.querySelector('#zip')
const forecastDate = document.querySelector('#date')
const forecastTemp = document.querySelector('#temp')
const forecastHumid = document.querySelector('#humid')
const forecastContent = document.querySelector('#content')
const forecastCity = document.querySelector('#city')
const userInput = document.querySelector('.myInput')
const userDisplay = document.querySelector('#user')




weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    forecastCity.innerHTML = 'Loading .....'
    forecastTemp.innerHTML = ''
    forecastHumid.innerHTML = ''
    forecastContent.innerHTML = ''
    userDisplay.innerHTML = ''

    fetch(`/weather?address=${location}`).then((response) => {
        response.json().then((data) => {

            if (data.error) {
                messageOne.innerHTML = data.error
            }
            else {
                console.log(data)
                forecastDate.innerHTML = getTimeStamp()
                forecastCity.innerHTML = `${data.location}`
                forecastTemp.innerHTML = `Temperature: ${data.projectData.temp}`
                forecastHumid.innerHTML = `Humidity: ${data.projectData.humid}`
                forecastContent.innerHTML = `Status : ${data.projectData.desc}`
                userDisplay.innerHTML = `I am feeling ${userInput.value}`
            }
        })
    })
})
