

const darkMode = document.querySelector("#light-dark");
const body = document.querySelector("body")

let darkModeToggle = false

darkMode.addEventListener("click", () => {
    darkModeToggle = !darkModeToggle
    console.log(darkModeToggle)
    
    body.style.backgroundColor = "black"
    body.style.color = "white"
    if(darkModeToggle == true) {
        body.style.backgroundColor = "black"
        body.style.color = "white" 
    } else {
        body.style.backgroundColor = "white"
        body.style.color = "black" 
    }
})

const errorButton = document.querySelector(".error-button")
const submitButton = document.querySelector("#btns")
const form = document.querySelector("#myForm")

errorButton.addEventListener("click", (e) => {
    console.log('button clicked')
    e.preventDefault();
    openForm();
})
form.addEventListener("click", (e) => {
    e.preventDefault();

})

function openForm() {
    document.getElementById("myForm").style.display = "block";
}

function closeForm() {
    document.getElementById("myForm").style.display = "none";
}

//James 

let cityInput = document.querySelector(".city-input");
let reportButton = document.querySelector(".report-button");
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("current-temperature");
const day = document.getElementById("date");
const weatherImg = document.getElementById("weather-photo");
const highLow = document.getElementById("high-low");


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

        let img = document.createElement("img");
        img.src = "https:" + data.forecast.forecastday[i].day.condition.icon;

        let high = Math.round(data.forecast.forecastday[i].day.maxtemp_f);
        let low = Math.round(data.forecast.forecastday[i].day.mintemp_f);
        let highLow2 = document.createElement("p");
        highLow2.textContent = `${high}° ${low}°`;

        container.append(dayName, img, highLow2);
        weeklyWeather.appendChild(container);

        
        container.addEventListener("click", function () {
            temperature.textContent = `${high}°`;
            day.textContent = dayName.textContent;
            weatherImg.src = img.src;
            highLow.textContent = highLow2.textContent;
        });
    }
}

let cityInput = document.querySelector(".city-input");
let reportButton = document.querySelector(".report-button");
reportButton.addEventListener("click", getCityWeather);

