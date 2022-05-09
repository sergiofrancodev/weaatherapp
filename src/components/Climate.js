import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Climate = () => {

    const [weatherApp, setWeatherApp] = useState({});
    const [tempK, setTempK] = useState(0);
    const [isKelvin, setIskelvin] = useState(true);
    const weatherChange = `${weatherApp.weather?.[0].main}`;
    const [changeBackground, setChangeBackground] = useState(weatherChange);
   

    if(changeBackground === "Clouds"){
        setChangeBackground(document.body.style.background=" url('https://weather-app.sergiofrancodev.com/clouds.gif') no-repeat")
        setChangeBackground(document.body.style.backgroundSize="cover")
      }else if(changeBackground === "Rain") {
        setChangeBackground(document.body.style.background=" url('https://weather-app.sergiofrancodev.com/rain.gif') no-repeat")
        setChangeBackground(document.body.style.backgroundSize="cover")
      }else if(changeBackground === "Clear") {
        setChangeBackground(document.body.style.background=" url('https://weather-app.sergiofrancodev.com/clear.gif') no-repeat")
        setChangeBackground(document.body.style.backgroundSize="cover")
      }else if(changeBackground === "Drizzle") {
        setChangeBackground(document.body.style.background=" url('https://weather-app.sergiofrancodev.com/rain.gif') no-repeat")
        setChangeBackground(document.body.style.backgroundSize="cover")
      }else if(changeBackground === "Thunderstorm") {
        setChangeBackground(document.body.style.background=" url('https://weather-app.sergiofrancodev.com/rain.gif') no-repeat")
        setChangeBackground(document.body.style.backgroundSize="cover")
      }

    console.log(changeBackground);
    useEffect(() => {

        var options = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        };

        function success(pos) {
            var crd = pos.coords;

            console.log('Your current position is:');
            console.log(`Latitude : ${crd.latitude}`);
            console.log(`Longitude: ${crd.longitude}`);
            console.log(`More or less ${crd.accuracy} meters.`);


            axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${crd.latitude}&lon=${crd.longitude}&appid=8c1743e8bb31396e83e27d5f01d73dfc`).then((res) => {
                setWeatherApp(res.data);
                setTempK(((res.data.main.temp - 273.15) * 9/5 + 32));
                setChangeBackground(res.data.weather?.[0].main);
                
            })

        }

        function error(err) {
            console.warn(`ERROR(${err.code}): ${err.message}`);
        }

        navigator.geolocation.getCurrentPosition(success, error, options);

    }, [])

    const changeMeditionTo = () =>{

        if(isKelvin){

            setTempK((tempK - 32)* 5/9);
            setIskelvin(false)

        }else{

            setTempK((tempK * 9/5) + 32) ;
            setIskelvin(true)

        }
    
        
    }

    
  
         
    console.log(weatherApp);

    return (

        <div className='card-weather'>


            <div className='name-app'>
                <h1>Weather App</h1>
                <br />
                <span className='city'>{weatherApp.name} , {weatherApp.sys?.country} </span>

                
            </div>
            <div className='icon-weather'>
                <img src={`http://openweathermap.org/img/wn/${weatherApp.weather?.[0].icon}@2x.png`} alt="" />
                <span className='description'>"{weatherApp.weather?.[0].description}"</span>
            </div>


            <div className='temperature'>
                
             <p>  {tempK.toFixed(2)} {isKelvin ? '°F' : '°C'}
                
                    <button onClick={changeMeditionTo}>Degrees °F / °C</button></p>
            </div>

            <div className='data-weather'>
                <ul>
                    <li>wind speed:<span className='results'> {weatherApp.wind?.speed} Mph</span></li>
                    <li>humidity: <span className='results'> {weatherApp.main?.humidity}%</span></li>
                    <li>pressure:  <span className='results'> {weatherApp.main?.pressure} mb</span></li>

                </ul>
                <br />
                <h3>made with love &#x2665; in Academlo</h3>
            </div>

        </div>




    );
};

export default Climate;