const key = "e08941e56a8168cf1346c31b308b4910";
//Obtiene posición del usuario.

const fetchData = position => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    fetch(`http://api.openweathermap.org/data/2.5/weather?appid&lat=${lat}&lon=${lon}&appid=${key}&units=metric`)
        .then(response => response.json())
        .then(data => setWeatherData(data))
}


const setWeatherData = data => {
    const weatherData = {
        location: data.name,
        description: data.weather[0].main,
        humidity: data.main.humidity,
        pressure: data.main.pressure,
        temperature: Math.floor(data.main.temp),
        date: getDate(),
    }
   
    Object.keys(weatherData).forEach( key => {
        document.getElementById(key).textContent = weatherData[key];
        //setTextContent(key, weatherData[key]);
    });

    document.getElementById("humidity").textContent = weatherData.humidity + " %"
    document.getElementById("pressure").textContent = weatherData.humidity + " mmHg"

    let clasList = weatherData.description;
    document.querySelector("#conteiner").classList.add(clasList);
    
    let $icon = document.querySelector(".icon");
    
    if(weatherData.description == "Rain") {
        $icon.textContent = "🌧️";
    }
    if(weatherData.description == "Sunny") {
        $icon.textContent = "🌤️";
    }
    if(weatherData.description == "Clouds") {
        $icon.textContent = "☁️";
    }
    if(weatherData.description == "Clear") {
        $icon.textContent = "☀️";
    }
    if(weatherData.description == "Showers") {
        $icon.textContent = "🌦️";
    }
 
}

const onload = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}


const getDate = () => {
    let date = new Date();
    return `${date.getDate()}-${ ('0' + (date.getMonth() + 1)).slice(-2)}-${date.getFullYear()}`;
}




