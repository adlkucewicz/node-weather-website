console.log('CLient side javascript file is loaded.')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''

    fetch('http://localhost:3000/weather?address=' + location).then((response) => {
    console.log(response)
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = 'Location: ' + data.weather.location
            messageTwo.textContent = 'Weather summary: ' + data.weather.current_weather_summary
            messageThree.textContent = 'Current Temperature: ' + data.weather.current_temp
        }
    })
})

})