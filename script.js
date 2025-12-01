const apiKey = "51260ccb489a4dffbf1102109252911";

async function getWeather() {
    const city = document.getElementById("cityInput").value || "Hyderabad";

    const url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        // Update current weather
        document.getElementById("cityName").innerText = data.location.name;
        document.getElementById("temperature").innerText = data.current.temp_c + "°C";
        document.getElementById("humidity").innerText = data.current.humidity + "%";
        document.getElementById("wind").innerText = data.current.wind_kph + " m/s";
        document.getElementById("weatherIcon").src = "https:" + data.current.condition.icon;

        // Update forecast
        let forecastHTML = "";
        data.forecast.forecastday.forEach(day => {
            forecastHTML += `
                <div class="forecast-day">
                    <img src="https:${day.day.condition.icon}">
                    <p>${day.day.avgtemp_c}°C</p>
                </div>
            `;
        });

        document.getElementById("forecast").innerHTML = forecastHTML;

    } catch (error) {
        alert("City not found!");
    }
}
