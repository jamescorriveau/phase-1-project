

    const getCityWeather = () => {
    const cityName = cityInput.value.trim();
    if (!cityName) return;

    const apiKey = '7db73fb6ebd6428c97d163149231311';
    const apiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=7&aqi=no&alerts=no`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            renderMainData(data);
            renderWeeklyWeather(data);
        });
}

const renderMainData = (data) => {
    document.getElementById('main-weather').innerText = data.current.condition.text;
};

const renderWeeklyWeather = (data) => {
    data.forecast.forecastday
    console.log(data)
};

let cityInput = document.querySelector(".city-input");
let reportButton = document.querySelector(".report-button");
reportButton.addEventListener("click", getCityWeather);