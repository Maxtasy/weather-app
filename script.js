const apiKey = "a5224489792af12aa5ff9b5dd6e24f52";

const inputContainer = document.querySelector(".input-container");
const weatherContainer = document.querySelector(".weather-container");
const cityNameElement = document.querySelector(".city-name");
const currentTemperature = document.querySelector(".current-temperature");
const currentFeelsLike = document.querySelector(".current-feels-like");
const currentHigh = document.querySelector(".current-high");
const currentLow = document.querySelector(".current-low");
const currentHumidity = document.querySelector(".current-humidity");
const currentWindSpeed = document.querySelector(".current-wind-speed");
const windDirection = document.querySelector(".wind-direction");
const errorMessage = document.querySelector(".error-text");
const cityNameInput = document.querySelector("#city-name-input");
const currentWeatherDesciption = document.querySelector(".weather-description");
const countryShorthandle = document.querySelector(".country");
const weatherIcon = document.querySelector(".weather-icon");


function populateData(cityName) {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
    fetch(url) // Call the fetch function passing the url of the API as a parameter
    .then((response) => {
        return response.json();
    })
    .then((data) => {
        if (data.cod === "404") {
            errorMessage.textContent = "City/Postal Code not found.";
            console.error(`${data.cod}: ${data.message}`);
            errorMessage.classList.add("show-error");
            return;
        }
        console.log(data);

        const windDir = data.wind.deg || 0;

        cityNameElement.textContent = data.name;
        countryShorthandle.textContent = data.sys.country;
        currentWeatherDesciption.textContent = data.weather[0].description;
        currentTemperature.textContent = `${data.main.temp.toFixed(1)}°C`;
        currentFeelsLike.textContent = `${data.main.feels_like.toFixed(1)}°C`;
        currentHigh.textContent = `${data.main.temp_max.toFixed(1)}°C`;
        currentLow.textContent = `${data.main.temp_min.toFixed(1)}°C`;
        currentHumidity.textContent = `${data.main.humidity}%`;
        currentWindSpeed.textContent = `${data.wind.speed}m/s`;
        weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;

        const weatherType = data.weather[0].main.toLowerCase();
        document.body.style.backgroundImage = `url(img/${weatherType}.jpg)`;

        windDirection.style.setProperty("--degrees", `${windDir}deg`);
        weatherContainer.classList.add("show");
        inputContainer.classList.add("top");
        errorMessage.classList.remove("show-error");
        cityNameInput.blur();
    })
    .catch(function(error) {
        console.log("Something went wrong", error);
    });
}

document.customForm.addEventListener("submit", function(e) {
    e.preventDefault();
    const cityName = this["city-name-input"].value;
    populateData(cityName);
    this.reset();
});