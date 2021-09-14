import "./styles.css";

// Registerd API Key
const API_KEY = 'c47b4627145107980be4b1d884e90419';

document.getElementById("js-query").addEventListener("click", async() => {
  const location = document.getElementById("js-location").value;

  // Check location validation and fetch data
  if(!location) {
    alert('Please input city!')
  } else {
    const response = await fetch(
    `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}`
    );

    if( response.status === 200 ){
      const data = await response.json();
      console.log('success', data);
      document.getElementById("info").innerHTML = `
        <h2 class="city text-center">${data.name}, ${data.sys['country']}</h2>
        <div class="temp text-center">${data.weather[0]['main']}, ${Math.ceil(data.main['temp'] - 273.15)}°C</div>
        <div class="description text-center"> Feels like ${Math.ceil(data.main['temp'] - 273.15)}°C, ${data.weather[0]['description']}</div>
        <ul class="weather">
          <li class="wind">Wind: ${data.wind['speed']}m/s</li>
          <li class="humidity">Humidity: ${data.main['humidity']}%</li>
          <li class="visibility">Visibility: ${data.visibility}m</li>
          <li class="pressure">Pressure: ${data.main['pressure']}hPa</li>
        </ul>
        `
    } else if( response.status === 404 ){
      document.getElementById("info").innerHTML = `
        <h2 class="city text-center">Data Not Found</h2>
        `
    } else {
      alert('Fetch Data Error : ', response)
    }
  }
});
