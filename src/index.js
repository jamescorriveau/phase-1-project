//POPULATES THE INTIAL PAGE TO SHOW NEW YORK
fetch("http://api.weatherapi.com/v1/forecast.json?key=7db73fb6ebd6428c97d163149231311&q=New York&days=7&aqi=no&alerts=no")
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    renderMainData(data);
    renderWeeklyWeather(data);
  });


//TOGGLE BUTTON
const darkMode = document.querySelector("#light-dark");
const body = document.querySelector("body")

let darkModeToggle = false

// darkMode.addEventListener ("click", () => {
//     console.log('dark mode working')
//     document.body.style.backgroundImage=("/Users/aaronlevy/Downloads/hand-drawn-flat-winter-solstice-background_23-2149171229.jpg")
// })
//  keep text white
// change the background 
darkMode.addEventListener("click", () => {
    darkModeToggle = !darkModeToggle
    console.log(darkModeToggle)
    body.style.color = "white"
    if(darkModeToggle == true) {
        body.style.backgroundImage = "url('/Users/aaronlevy/Downloads/hand-drawn-flat-winter-solstice-background_23-2149171229.jpg')"
        body.style.color = "white" 
    } else {
        body.style.backgroundImage = "url('images/gorgeous-clouds-background-with-blue-sky-design_1017-25501.jpg')"
        body.style.color = "white" 
    }
})

//ERROR BUTTON
const errorButton = document.querySelector(".error-button")
const submitButton = document.querySelector("#btns")
console.log(submitButton)
const form = document.querySelector("#myForm")
const cancelButton = document.querySelector("#btnc")

errorButton.addEventListener("click", (e) => {
    console.log('button clicked')
    e.preventDefault();
    openForm();
})
form.addEventListener("click", (e) => {
    e.preventDefault();
})

submitButton.addEventListener("click" , (e) => {
    e.preventDefault()
    alert("Form has been submitted")
    console.log("submit button clicked")
})

cancelButton.addEventListener("click", (e) => {
    closeForm();
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

// REMOVED SEARCH BUTTON AND REPLACED WITH 'KEYPRESS' EVENT
// reportButton.addEventListener("click", getCityWeather);

cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        e.preventDefault();
        getCityWeather();
        cityInput.value = "";
    }
});

//kenneth

function renderMainData(data) {
    cityName.textContent = data["location"]["name"]
    
    let currentTemperature = Math.round(data["current"]["temp_f"]);
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


function renderWeeklyWeather(weather) {
    const weeklyWeather = document.getElementById("weekly-weather");
    let dayContainers = weeklyWeather.getElementsByClassName("weekly-day-container");

    Array.from(dayContainers).forEach(function(element) {
        element.remove();
    });    

    for(let i = 0; i < 7; i++) {
        let date = document.createElement("div");
        let container = document.createElement("div");
        let weeklyDate = weather["forecast"]["forecastday"][i]["date"]; 
        date.textContent = weeklyDate;

        let img = document.createElement("img");
        let source = "https:" + weather["forecast"]["forecastday"][i]["day"]["condition"]["icon"]
        img.src = source;

        const highLow2 = document.createElement("p");
        let high = Math.round(weather["forecast"]["forecastday"][i]["day"]["maxtemp_f"]);
        let low = Math.round(weather["forecast"]["forecastday"][i]["day"]["mintemp_f"]);
        const dateObject = new Date(weeklyDate);
        const dayOfWeekNumber = dateObject.getDay();
        const weekdays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday","Sunday"];
        const dayOfWeekName = weekdays[dayOfWeekNumber];
        date.textContent = dayOfWeekName;

        const temperatureHighLow = `${high}° ${low}°`
        const highParsed = parseInt(high);
        highLow2.textContent = temperatureHighLow;

        weeklyWeather.append(container);
        container.className = "weekly-day-container"
        container.append(date, img, highLow2);

        //event listener for images
        img.addEventListener("click", function() {
            temperature.textContent = `${high}°`;
            day.textContent = dayOfWeekName;
            weatherImg.src = source;
            highLow.textContent = temperatureHighLow;
            const weatherForecast = weather.forecast.forecastday[i].day.condition.text;
            renderRecommendation(weatherForecast, highParsed);
        })


    }

}


function renderRecommendation(data, temperature) {
    let clothes = {
        cold : ['Jacket', 'Scarf', 'Gloves'],
        warm : ['Sweater', 'Hoodie', 'Long Pants'],
        hot : ['Shortsleeves', 'Shorts', 'Sunscreen'],
        raining: ['Umbrella','Rain shoes','Rain coats'],
        snowing: ['Boots', 'Insulated Jacket and Pants', 'Beanie'],
    }
    
    const liElements = document.querySelectorAll('#clothes li');

    if(data.toLowerCase().includes("rain")) {
        liElements.forEach(function(li, i) {
            li.textContent = clothes.raining[i]; 
        });
    } else if(data.toLowerCase().includes("snow")) {
        liElements.forEach(function(li, i) {
            li.textContent = clothes.snowing[i]; 
        });
    } else if(temperature <= 30){
        liElements.forEach(function(li, i) {
            li.textContent = clothes.cold[i]; 
        });
    } else if(temperature > 30 && temperature < 69) {
        liElements.forEach(function(li, i) {
            li.textContent = clothes.warm[i]; 
        });
    } else {
        liElements.forEach(function(li, i) {
            li.textContent = clothes.hot[i]; 
    });
}
}