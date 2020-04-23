const apiKey = "a5224489792af12aa5ff9b5dd6e24f52";

const inputContainer = document.querySelector(".input-container");
const weatherContainer = document.querySelector(".weather-container");
const cityNameElement = document.querySelector(".city-name");
const currentTemperature = document.querySelector(".current-temperature");
const currentHumidity = document.querySelector(".current-humidity");
const currentWindSpeed = document.querySelector(".current-wind-speed");
const windDirectionNeedle = document.querySelector(".wind-direction-needle");
const errorMessage = document.querySelector(".error-text");
const cityNameInput = document.querySelector("#city-name-input");
const currentWeatherDesciption = document.querySelector(".weather-description");
const countryShorthandle = document.querySelector(".country");


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

        const windDirection = data.wind.deg || 0;

        cityNameElement.textContent = data.name;
        countryShorthandle.textContent = data.sys.country;
        currentWeatherDesciption.textContent = data.weather[0].description;
        currentTemperature.textContent = `${data.main.temp}°C`;
        currentWindSpeed.textContent = `${data.wind.speed}m/s`;
        currentHumidity.textContent = `${data.main.humidity}%`;

        windDirectionNeedle.style.setProperty("--degrees", `${windDirection}deg`);
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