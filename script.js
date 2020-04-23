const apiKey = "a5224489792af12aa5ff9b5dd6e24f52";

const inputContainer = document.querySelector(".input-container");
const weatherContainer = document.querySelector(".weather-container");
const cityElement = document.querySelector(".city");
const degreesElement = document.querySelector(".degrees");
const windSpeedElement = document.querySelector(".wind-speed");
const windDirectionNeedle = document.querySelector(".wind-direction-needle");
const errorMessage = document.querySelector(".error-text");
const cityNameInput = document.querySelector("#city-name-input");


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
        cityElement.textContent = `${data.name} (${data.sys.country})`;
        degreesElement.textContent = `${data.main.temp}°C`;
        windSpeedElement.textContent = `${data.wind.speed}m/s`;
        const windDirection = data.wind.deg || 0;
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