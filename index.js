const apiKey = window.electronAPI.getApiKey();
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {

        var data = await response.json();
        const country = document.querySelector(".country");
        country.innerHTML = data.sys.country;
        const flagImg = document.createElement("img");
        const countryCode = data.sys.country.toLowerCase();
       
        flagImg.src = `https://flagcdn.com/w320/${countryCode}.png`;
        flagImg.alt = `${data.sys.country} Flag`;
        flagImg.classList.add("flag");
        document.querySelector(".country").appendChild(flagImg);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =  Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main == "Clouds") {
            weatherIcon.src = "images/clouds.png";
        }

        else if (data.weather[0].main == "Clear") {
            weatherIcon.src = "images/clear.png";
        }

        else if (data.weather[0].main == "Rain") {
            weatherIcon.src = "images/rain.png";
        }

        else if (data.weather[0].main == "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
        }

        else if (data.weather[0].main == "Mist") {
            weatherIcon.src = "images/mist.png";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";

        // Wind direction
        function getWindDirection(degree) {
            const val = Math.floor((degree / 22.5) + 0.5);
            const directions = [
                "N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE",
                "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"
            ];
            return directions[(val % 16)];
        }
        const windDirection = getWindDirection(data.wind.deg);
        document.querySelector(".wind-direction").innerHTML = `${windDirection}`;    

        // Sunrise and Sunset times
        function formatTime(unix, timezoneOffset) {
        const date = new Date((unix + timezoneOffset) * 1000);
        const hours = date.getUTCHours().toString().padStart(2, '0');
        const minutes = date.getUTCMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    const timezoneOffset = data.timezone;
    const sunriseTime = formatTime(data.sys.sunrise, timezoneOffset);
    const sunsetTime = formatTime(data.sys.sunset, data.timezone);
    document.querySelector(".sunrise").innerHTML = `🌅 Sunrise: ${sunriseTime}`;
    document.querySelector(".sunset").innerHTML = `🌇 Sunset: ${sunsetTime}`;
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchBox.value);
    }
});

const minimizeBtn = document.querySelector('.minimize-btn');
if (minimizeBtn) {
    minimizeBtn.addEventListener('click', () => {
        if (window.electronAPI) {
            window.electronAPI.minimize();
        }
    });
}