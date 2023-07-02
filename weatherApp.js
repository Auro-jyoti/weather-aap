const apikey = "264240883324a289b7cd836fd1775571";

const weatherEle = document.getElementById("weather-data");

const cityInputEle = document.getElementById("city-input");

const formEle = document.querySelector("form");



formEle.addEventListener("submit", (event) => {
    event.preventDefault();
    const city = cityInputEle.value;
    getWeatherData(city);
});

async function getWeatherData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);

        if(!response.ok) {
            throw new Error("Network Response was not ok");
        }

        const data = await response.json();

        const temperature = Math.round(data.main.temp);

        const description = data.weather[0].description;

        const icon = data.weather[0].icon;
        
        const details = [
            `feels like: ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity}%`,
            `Wind speed : ${data.wind.speed} m/s`
        ]

        weatherEle.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png alt = "Weather Icon">`;
        weatherEle.querySelector(".temp").textContent = `${temperature} C`;
        weatherEle.querySelector(".description").textContent = `${description}`;

        weatherEle.querySelector(".details").innerHTML = details.map((detail) => {
            `<div>${detail}</div>`
        }).join("");

    } catch (error) {
        weatherEle.querySelector(".icon").innerHTML = ``;
        weatherEle.querySelector(".temp").textContent = ``;
        weatherEle.querySelector(".description").textContent = "Please try again later";

        weatherEle.querySelector(".details").innerHTML = "";
    }
}