function fetchWeather() {
    const cityInput = document.getElementById('cityInput').value;
    const apiKey = '44c95adcb77714ccbd148f51978b5cd3';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const weatherInfo = document.getElementById('weatherInfo');
            const { name, main, weather } = data;
            const temperature = main.temp;
            const description = weather[0].description;

            // Create SVG image element based on weather description
            let weatherImg;
            if (description.includes('clear')) {
                weatherImg = '<img style="width: 100px;" src="assets/sun.svg">'; 
            } else if (description.includes('cloud')) {
                weatherImg = '<img style="width: 100px;" src="assets/cloudy.svg">'; 
            } else if (description.includes('rain') || description.includes('shower')) {
                weatherImg = '<img style="width: 100px;" src="assets/rain.svg">'; 
            } else {
                weatherImg = ''; // Handle other weather conditions
            }

            // Update weatherInfo div with weather information and image
            weatherInfo.innerHTML = `
                ${weatherImg}
                <h2>${name}</h2>
                <p>Temperature: ${temperature}°C</p>
                <p>Description: ${description}</p>
                
            `;
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            const weatherInfo = document.getElementById('weatherInfo');
            weatherInfo.innerHTML = '<p>Error fetching weather data. Please try again.</p>';
        });
}
