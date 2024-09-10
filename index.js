const url = {
    rainy: "./assets/rainy.jpg",
    sunny: "./assets/sunny.jpg",
    cloudy: "./assets/cloudy.jpg",
    clear: "./assets/clear.jpg",
};

function getBackgroundImage(condition) {
    if (condition.includes('rain')) return url.rainy;
    if (condition.includes('sun')) return url.sunny;
    if (condition.includes('cloud')) return url.cloudy;
    return url.clear; 
}

function getWeather() {
    const cityInput = document.getElementById('cityInput').value || "addis";
    const apiKey = process.env.API_KEY;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityInput}&aqi=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            const weatherInfoDiv = document.getElementById('weatherInfo');
            const weatherDetailDiv = document.getElementById('weather-details');

            weatherInfoDiv.style.visibility = "visible";
            weatherDetailDiv.style.visibility = "visible";
            weatherInfoDiv.innerHTML = `
                <h1>${data.current.temp_c}°C</h1>
                <div>
                    <h2>${data.location.name}, ${data.location.country}</h2>
                    <p>${data.location.localtime}</p>
                </div>
                <div>
                    <img src="${data.current.condition.icon}" alt="${data.current.condition.text}">
                    <p>${data.current.condition.text}</p>
                </div>
            `;
            weatherDetailDiv.innerHTML = `
                <h2>Weather details</h2>
                <p>Cloud cover: ${data.current.cloud}%</p>
                <p>Humidity: ${data.current.humidity}%</p>
                <p>Wind speed: ${data.current.wind_kph} km/h</p>
            `;

            const conditionText = data.current.condition.text.toLowerCase();
            const backgroundImageUrl = getBackgroundImage(conditionText);
            document.body.style.backgroundImage = `url(${backgroundImageUrl})`;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfoDiv = document.getElementById('weatherInfo');
            weatherInfoDiv.innerHTML = 'Error fetching weather data. Please try again later.';
        });
}

window.addEventListener('DOMContentLoaded', () => {
    getWeather();
});
const cityInput = document.getElementById('cityInput')
const getBtn = document.getElementById('get')
cityInput.addEventListener('keyup', (e)=>{
    if(e.key === 'Enter'){
        getWeather();
    }
})
getBtn.addEventListener('click', ()=>{
        getWeather();
})