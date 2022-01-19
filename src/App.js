import { useEffect, useState } from 'react';
import axios from 'axios';
let url = 'https://fcc-weather-api.glitch.me/api/current?';

const initialState = {
  name: '',
  country: '',
  temp: '',
  temp_max: '',
  temp_min: '',
  description: '',
  icon: '',
};
function App() {
  const [error, setError] = useState(false);
  const [weather, setWeather] = useState();
  const getGeolocation = () => {
    if (!navigator.geolocation) {
      setError(true);
    }

    navigator.geolocation.getCurrentPosition((position) => {
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      axios(`${url}lat=${lat}&lon=${lon}`)
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => console.log(error));
    });
  };

  useEffect(() => {
    let ready = setInterval(() => {
      if (document.readyState === 'complete') {
        getGeolocation();
        clearInterval(ready);
      }
    }, 100);
  }, []);

  return (
    <div>
      <h1>Weather App</h1>
    </div>
  );
}

export default App;
