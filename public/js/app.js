const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')
const messageThree = document.querySelector('#message-3')
const messageFour = document.querySelector('#message-4')
const messageFive = document.querySelector('#message-5')
const messageSix = document.querySelector('#message-6')
const weatherIcon = document.getElementById('weather-icon')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''
    messageThree.textContent = ''
    messageFour.textContent = ''
    messageFive.textContent = ''
    messageSix.textContent = ''
    weatherIcon.attributes[1].textContent = ''




    fetch('/weather?address=' + location).then((response) => {
    response.json().then((data) => {
        if (data.error) {
            messageOne.textContent = data.error
        } else {
            messageOne.textContent = 'Location: ' + data.weather.location
            messageTwo.textContent = 'Weather summary: ' + data.weather.current_weather_summary + '. With a high of ' + data.weather.max_temp + '°C and low of ' + data.weather.min_temp + '°C.'
            messageThree.textContent = 'Current Temperature: ' + data.weather.current_temp + '°C'
            messageFour.textContent = 'Feels like: ' + data.weather.current_feels_temp + '°C'
            messageFive.textContent = 'Current Humidity: ' + data.weather.current_humidity + '%'
            messageSix.textContent = 'Chance of rain today: ' + data.weather.chance_of_rain + '%'
            weatherIcon.attributes[1].textContent = data.weather.weather_icon

        }
    })
})

})