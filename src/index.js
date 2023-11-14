
fetch("http://api.weatherapi.com/v1/forecast.json?key=7db73fb6ebd6428c97d163149231311&q=New York&days=7&aqi=no&alerts=no")
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    renderMainData(data);
    renderWeeklyWeather(data);
  });

const cityName = document.getElementById("city-name");
const temperature = document.getElementById("current-temperature");
const day = document.getElementById("date");
const weatherImg = document.getElementById("weather-photo");
const highLow = document.getElementById("high-low");


function renderMainData(data) {
    cityName.textContent = data["location"]["name"]
    
    let currentTemperature = data["current"]["temp_f"]
    temperature.textContent = `${currentTemperature}°`;
    const temperatureNum = parseInt(currentTemperature);
    
    const liElements = document.querySelectorAll('#clothes li');
    const currentWeather = data.current.condition.text;

    renderRecommendation(currentWeather, temperatureNum);
    
        
    const date = data["forecast"]["forecastday"][0]["date"];
    const dateObject = new Date(date);
    const dayOfWeekNumber = dateObject.getDay();


    const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
    const dayOfWeekName = weekdays[dayOfWeekNumber];
    day.textContent = dayOfWeekName;
    
    weatherImg.src = "https:" + data["forecast"]["forecastday"][0]["day"]["condition"]["icon"];
    
    let high = Math.round(data["forecast"]["forecastday"][0]["day"]["maxtemp_f"]);
    let low = Math.round(data["forecast"]["forecastday"][0]["day"]["mintemp_f"]);

    highLow.textContent = `${high}° ${low}°`
}


function renderWeeklyWeather(data) {
    const weeklyWeather = document.getElementById("weekly-weather");
    weeklyWeather.innerHTML = ""; 

    for (let i = 0; i < data.forecast.forecastday.length; i++) {
        let container = document.createElement("div");
        let date = new Date(data.forecast.forecastday[i].date);
        let dayName = document.createElement("div");
        dayName.textContent = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][date.getDay()];

        let img = document.createElement("img");
        img.src = "https:" + data.forecast.forecastday[i].day.condition.icon;

        const highLow2 = document.createElement("p");
        let high = Math.round(weather["forecast"]["forecastday"][i]["day"]["maxtemp_f"]);
        let low = Math.round(weather["forecast"]["forecastday"][i]["day"]["mintemp_f"]);
        const dateObject = new Date(weeklyDate);
        const dayOfWeekNumber = dateObject.getDay();
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
        const dayOfWeekName = weekdays[dayOfWeekNumber];
        date.textContent = dayOfWeekName;

        const temperatureHighLow = `${high}° ${low}°`
        highLow2.textContent = temperatureHighLow;

        weeklyWeather.append(date,container);
        container.append(img, highLow2);

        //event listener for images
        img.addEventListener("click", function() {
            temperature.textContent = `${high}°`;
            day.textContent = dayOfWeekName;
            weatherImg.src = source;
            highLow.textContent = temperatureHighLow;
        })


    }


}


